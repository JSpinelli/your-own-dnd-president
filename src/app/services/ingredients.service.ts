import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class IngredientsService {

    ingredients: Ingredient[] = [];
    startedEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();

    constructor() { }

    public addIngredient(ing: Ingredient) {
        if (this.ingredients) {
            this.ingredients.push(ing);
        } else {
            this.ingredients = [ing];
        }
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public getIngredients() {
        return this.ingredients.slice();
    }

    public getIngredient(index: number) {
        return this.ingredients[index];
    }

    public replaceIngredient(index: number, ing: Ingredient) {
        this.ingredients[index] = ing;
    }

    public deleteItem(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public clearList() {
        this.ingredients.splice(0);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public getTotal() {
        return this.ingredients.length;
    }

    public setList(list: Ingredient[]) {
        this.ingredients = list;
    }
}
