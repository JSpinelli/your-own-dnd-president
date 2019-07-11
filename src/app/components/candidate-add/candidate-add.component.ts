import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { CandidateService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css'],
  providers: [IngredientsService]
})
export class CandidateAddComponent implements OnInit, CanComponentDeactivate {

  id: number;
  candidateForm: FormGroup;
  ingredientsForm: FormArray;
  changesSaved = true;
  defaultName = 'This is a default Name, CHANGE IT!';
  imgSet = false;
  editMode = false;
  imgPath = 'https://cdn.shopify.com/s/files/1/0122/1738/5019/files/CriticalRole_Logo_Black512x512_512x.png?v=1539919482';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidates: CandidateService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
      }
    );
 
    if (this.editMode) {
      this.loadInfo();
    }
    
  }

  loadInfo() {
    const ingredientList= new FormArray([]);
    let candName="";
    let candDesc="";
    let candImg='https://cdn.shopify.com/s/files/1/0122/1738/5019/files/CriticalRole_Logo_Black512x512_512x.png?v=1539919482';
    if (this.editMode) {
      const candidate = this.candidates.getCandidate(this.id);
      for (let ingredient of candidate.ingredients) {
        ingredientList.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, Validators.required),
          desc: new FormControl(ingredient.description)
        }));
      }
      candName=candidate.name;
      candDesc=candidate.description;
      candImg=candidate.imagePath;
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

  onSubmit() {
    console.log('SUBMIT');
    console.log(this.candidateForm);
    // this.formReference.form.reset() // Reset the state of the form
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    } else {
      return confirm('Do you want to discard changes?');
    }
  }

  getControls() {
    return (this.candidateForm.get('ingredients') as FormArray).controls;
  }
}
