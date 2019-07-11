import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
    const ing = new Ingredient(form.value.name, form.value.desc, form.value.amount);
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
  }

  clearList() {
    this.ingredients.clearList();
  }

  cancel() {
    this.ingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
