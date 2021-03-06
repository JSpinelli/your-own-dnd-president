import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/services/candidates.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { ApiResponse } from 'src/app/shared/ApiResponse.model';
import { Candidate } from 'src/app/shared/candidate.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { CanComponentDeactivate } from '../../../services/can-deactivate-guard.service';
import { Authservice } from '../../auth/auth.service';
import { ApiInfo } from '../Api-Data/api-info.service';

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
  info = null;
  submitted = false;
  apiResponse: ApiResponse;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidates: CandidateService,
    private auth: Authservice,
    private http: HttpClient,
    private api: ApiInfo
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.key = params.id;
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
          // amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          // desc: new FormControl(ingredient.description)
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
      name: new FormControl('', Validators.required),
      // amount: new FormControl('Amount', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      // desc: new FormControl('Description')
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
      ingredients.push(new Ingredient(ingToAdd.value.name, ' ', 1));
    }
    this.apiResponse = await this.api.processInfo(values.candidateInfo.img, values.candidateInfo.name, values.candidateInfo.desc, ingredients);
    const candidateToAdd = new Candidate(
      values.candidateInfo.name,
      values.candidateInfo.desc,
      values.candidateInfo.img,
      ingredients,
      this.auth.currentUserId,
      this.api.apiResponse.imageResponse.labels.toString()
    );
    if (this.editMode) {
      this.candidates.updateCandidate(candidateToAdd, this.key);
    } else {
      this.candidates.registerNewCandidate(candidateToAdd);
    }
    this.candidateForm.reset();
    this.changesSaved = true;
    //this.router.navigate(['/candidates']);
    this.submitted = true;
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
