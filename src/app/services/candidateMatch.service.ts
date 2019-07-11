import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../shared/recipe.model';
import { LoggerService } from './logger.service';

export class CandidateMatchService {

    ingredients: Ingredient[] = [];
    recipes: Recipe[];
    itemSelected: number;

    constructor(private logger: LoggerService) { }

    public addIngredient(ing: Ingredient) {
        if (this.ingredients) {
            this.ingredients.push(ing);
        } else {
            this.ingredients = [ing];
        }
        this.logger.log('Added: ' + ing.name);
    }

    public getIngredients() {
        return this.ingredients;
    }

    public selectItem(index: number) {
        this.itemSelected = index;
        console.log(this.ingredients[this.itemSelected].name);
    }

    public deleteItem() {
        this.ingredients.splice(this.itemSelected, 1);
    }

    public clearList() {
        this.ingredients.splice(0);
    }
}
