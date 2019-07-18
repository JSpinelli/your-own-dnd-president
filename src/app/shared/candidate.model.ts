import { Ingredient } from './ingredient.model';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

export class Candidate {
    public name: string;
    public id: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public dateOfCreation: Date;
    public owner: string;
    public upVotes:number;
    public downVotes:number;
    public ispublic:boolean

    constructor(name: string, desc: string, imPath: string, ingredients: Ingredient[], owner:string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imPath;
        this.ingredients = ingredients;
        this.upVotes=0;
        this.downVotes=0;
        this.ispublic=false;
        this.owner=owner;
        this.dateOfCreation= new Date();
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients = ings;
    }
}
