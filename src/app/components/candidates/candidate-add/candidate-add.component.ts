import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../services/can-deactivate-guard.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { CandidateService } from 'src/app/services/candidates.service';
import { Candidate } from 'src/app/shared/candidate.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Authservice } from '../../auth/auth.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css'],
  providers: [IngredientsService]
})
export class CandidateAddComponent implements OnInit, CanComponentDeactivate {

  id: number;
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
    private auth:Authservice,
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
    let candName = "";
    let candDesc = "";
    let candImg = "";
    if (this.editMode) {
      const candidate = this.candidates.getCandidate(this.id);
      for (let ingredient of candidate.ingredients) {
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

  onSubmit() {
    const values = this.candidateForm.value;
    const ingredients: Ingredient[] = [];
    for (const ingToAdd of this.getControls()) {
      ingredients.push(new Ingredient(ingToAdd.value.name, ingToAdd.value.desc, ingToAdd.value.amount));
    }
    const candidateToAdd = new Candidate(
      values.candidateInfo.name,
      values.candidateInfo.desc,
      values.candidateInfo.img,
      ingredients,
      this.auth.user.getValue().id
      );
    if (!this.editMode) {
      this.candidates.updateCandidate(candidateToAdd, this.id);
    } else {
      this.candidates.registerNewCandidate(candidateToAdd);
    }
    this.candidateForm.reset();
    this.changesSaved = true;
    this.router.navigate(['/candidates']);
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
