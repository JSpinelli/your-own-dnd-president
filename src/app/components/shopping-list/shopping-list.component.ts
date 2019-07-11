import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { IngredientsService } from '../../services/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})

export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
  }

  newIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  itemSelected(index: number) {
    this.ingredientsService.startedEditing.next(index);
  }

}
