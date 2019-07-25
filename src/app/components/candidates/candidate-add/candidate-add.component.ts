import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/services/candidates.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Candidate } from 'src/app/shared/candidate.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { environment } from 'src/environments/environment';
import { CanComponentDeactivate } from '../../../services/can-deactivate-guard.service';
import { Authservice } from '../../auth/auth.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css'],
  providers: [IngredientsService]
})
export class CandidateAddComponent implements OnInit, CanComponentDeactivate {

  id: number;
  key: string;
  showDescField: boolean[] = [];
  candidateForm: FormGroup;
  ingredientsForm: FormArray;
  changesSaved = false;
  defaultName = 'This is a default Name, CHANGE IT!';
  imgSet = false;
  editMode = false;
  defaultImage = 'https://cdn.shopify.com/s/files/1/0122/1738/5019/files/CriticalRole_Logo_Black512x512_512x.png?v=1539919482';
  imgPath = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidates: CandidateService,
    private auth: Authservice,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
      }
    );
    this.loadInfo();
  }

  loadInfo() {
    const ingredientList = new FormArray([]);
    let candName = '';
    let candDesc = '';
    let candImg = '';
    if (this.editMode) {
      const candidateRef = this.candidates.getCandidate(this.key);
      const candidate = candidateRef.payload.val();
      this.key = candidateRef.key;
      for (const ingredient of candidate.ingredients) {
        ingredientList.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          desc: new FormControl(ingredient.description)
        }));
        this.showDescField.push(false);
      }
      candName = candidate.name;
      candDesc = candidate.description;
      candImg = candidate.imagePath;
      this.imgPath = candidate.imagePath;
    }
    this.candidateForm = new FormGroup({
      candidateInfo: new FormGroup({
        name: new FormControl(candName, Validators.required),
        desc: new FormControl(candDesc, Validators.required),
        img: new FormControl(candImg)
      }),
      ingredients: ingredientList
    });
  }

  addIngredient() {
    (this.candidateForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl('Name', Validators.required),
      amount: new FormControl('Amount', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      desc: new FormControl('Description')
    }));
    this.showDescField.push(false);
  }
  deleteIngredient(index: number) {
    (this.candidateForm.get('ingredients') as FormArray).removeAt(index);
    this.showDescField.splice(index, 1);
  }

  async onSubmit() {
    const values = this.candidateForm.value;
    const ingredients: Ingredient[] = [];
    for (const ingToAdd of this.getControls()) {
      ingredients.push(new Ingredient(ingToAdd.value.name, ingToAdd.value.desc, ingToAdd.value.amount));
    }
    const tags = await this.cloudVision(values.candidateInfo.img);
    await this.naturalLanguage(values.candidateInfo.name, values.candidateInfo.desc,ingredients)
    const candidateToAdd = new Candidate(
      values.candidateInfo.name,
      values.candidateInfo.desc,
      values.candidateInfo.img,
      ingredients,
      this.auth.currentUserId,
      tags
    );
    if (this.editMode) {
      this.candidates.updateCandidate(candidateToAdd, this.key);
    } else {
      this.candidates.registerNewCandidate(candidateToAdd);
    }
    this.candidateForm.reset();
    this.changesSaved = true;
    this.router.navigate(['/candidates']);
  }

  async naturalLanguage(name: string, desc: string, ing: Ingredient[]) {
    let text: string = name;
    text = text + ' ' + desc;
    for (let index = 0; index < ing.length; index++) {
      const element = ing[index].name;
      text = text + ' ' + element;
    }
    const body = {
      document: {
        type: 'PLAIN_TEXT',
        content: text,
      },
      encodingType: 'UTF8'
    };
    await this.http.post(
      'https://language.googleapis.com//v1/documents:analyzeSentiment?key=' + environment.VISION_KEY
      , body).toPromise()
      .then(
        (responseData: any) => {
          console.log('DOC SENTIMENT '+ responseData.documentSentiment.score);
          const sentences = responseData.sentences;
          sentences.forEach(sentence => {
            console.log("The sentence: "+ sentence.text.content);
            console.log("Sentiment: " + sentence.sentiment.score);
          });
        }
    );
  }

  async cloudVision(uri: string): Promise<string> {
    // Creates a client
    const body = {
      requests: [
        {
          features: [
            {
              type: 'LABEL_DETECTION'
            },
            {
              type: 'FACE_DETECTION'
            },
            {
              type: 'SAFE_SEARCH_DETECTION'
            }
          ],
          image: {
            source: {
              imageUri: uri
            }
          }
        }]
    };
    let tagsToReturn = '';
    await this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.VISION_KEY, body).toPromise().then(
      (responseData: any) => {
        console.log(responseData);
        if (responseData.responses[0].hasOwnProperty('error')) {
          tagsToReturn = 'It seems there was an error retrieving the labels';
        } else {
          const labels = responseData.responses[0].labelAnnotations;
          const faces = responseData.responses[0].faceAnnotations;
          const safe = responseData.responses[0].safeSearchAnnotation;
          console.log('Labels:');
          labels.forEach(label => {
            tagsToReturn = tagsToReturn + ' - ' + label.description;
            console.log(label.description);
          }
          );
          console.log('Faces: ');
          if (faces){
            faces.forEach(face => {
              console.log('JOY ' + face.joyLikelihood);
              console.log('SORROW ' + face.sorrowLikelihood);
              console.log('ANGER ' + face.angerLikelihood);
              console.log('SURPRISE ' + face.surpriseLikelihood);
              console.log('HEADWEAR ' + face.headwearLikelihood);
            });
          }
          console.log('Safe: ');
          console.log('ADULT ' + safe.adult);
          console.log('SPOOF ' + safe.spoof);
          console.log('MEDICAL ' + safe.medical);
          console.log('VIOLENCE ' + safe.violence);
          console.log('RACY ' + safe.racy);
        }
      },
    );
    return tagsToReturn;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.candidateForm.touched) {
      if (this.changesSaved) {
        return true;
      } else {
        return confirm('Do you want to discard changes?');
      }
    } else {
      return true;
    }
  }

  getControls() {
    return (this.candidateForm.get('ingredients') as FormArray).controls;
  }
}
