import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { IngredientsService } from '../../services/ingredients.service';
import { Subscription } from 'rxjs';
import { addIngredientAnim } from '../../shared/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
  animations: [
    addIngredientAnim,
  ]
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  subscription: Subscription;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
    this.subscription = this.ingredientsService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  itemSelected(index: number) {
    this.ingredientsService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  animationStarted(event){
    console.log("The animation started");
  }

}
