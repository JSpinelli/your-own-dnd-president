import { Ingredient } from './ingredient.model';


export class Candidate {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public imageTags: string;
    public votes: any;
    public dateOfCreation: Date;
    public owner: string;
    public ispublic: boolean;

    constructor(name: string, desc: string, imPath: string, ingredients: Ingredient[], owner: string, tags:string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imPath;
        this.ingredients = ingredients;
        this.ispublic = false;
        this.owner = owner;
        this.dateOfCreation = new Date();
        this.votes = '';
        this.imageTags=tags;
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients = ings;
    }
}
