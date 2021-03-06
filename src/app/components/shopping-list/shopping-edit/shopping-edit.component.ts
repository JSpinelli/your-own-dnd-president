import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) ingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editIndex: number;
  editIngredient: Ingredient;
  listPopulated = false;

  constructor(private ingredients: IngredientsService) { }

  ngOnInit() {
    this.subscription = this.ingredients.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editIngredient = this.ingredients.getIngredient(index);
        this.ingForm.setValue({
          name: this.editIngredient.name,
          desc: this.editIngredient.description,
          amount: this.editIngredient.amount
        });
      }
    );
    this.listPopulated = this.ingredients.getTotal() > 0;
  }

  onIngredientAdded(form: NgForm) {
    console.log("/ SUBMIT");
    const ing = new Ingredient(form.value.name,' ', 1);
    if (this.editMode) {
      this.ingredients.replaceIngredient(this.editIndex, ing);
      this.editMode = false;
    } else {
      this.ingredients.addIngredient(ing);
    }
    this.ingForm.reset();
    this.listPopulated = this.ingredients.getTotal() > 0;
  }

  deleteItem() {
    this.ingredients.deleteItem(this.editIndex);
    this.listPopulated = this.ingredients.getTotal() > 0;
    this.editMode = false;
    this.ingForm.reset();
  }

  clearList() {
    this.ingredients.clearList();
    this.listPopulated = this.ingredients.getTotal() > 0;
    this.editMode = false;
  }

  cancel() {
    this.ingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
