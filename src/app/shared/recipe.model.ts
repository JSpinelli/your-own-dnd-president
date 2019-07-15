import { Ingredient } from './ingredient.model';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

export class Recipe {
    public name: string;
    public id:string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, imPath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imPath;
        this.ingredients = ingredients;
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients = ings;
    }
}
