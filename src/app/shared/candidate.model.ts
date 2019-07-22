import { Ingredient } from './ingredient.model';

export class Votes {
    $id:{
        value:boolean
    }
}

export class Candidate {
    public name: string;
    public id: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public votes: any;
    public dateOfCreation: Date;
    public owner: string;
    public ispublic: boolean;

    constructor(name: string, desc: string, imPath: string, ingredients: Ingredient[], owner: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imPath;
        this.ingredients = ingredients;
        this.ispublic = false;
        this.owner = owner;
        this.dateOfCreation = new Date();
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients = ings;
    }
}
