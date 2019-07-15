import { Ingredient } from './ingredient.model';

export class Candidate {
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
