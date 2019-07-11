import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { CandidateMatchService } from '../../services/candidateMatch.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})

export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private candidateMatch: CandidateMatchService) { }

  ngOnInit() {
    this.ingredients = this.candidateMatch.getIngredients();
  }

  newIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  itemSelected(index: number) {
    this.candidateMatch.selectItem(index);
  }

}
