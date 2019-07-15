import { Ingredient } from '../shared/ingredient.model';
import { Candidate } from '../shared/candidate.model';
import { LoggerService } from './logger.service';
import { Subject } from 'rxjs';

export class IngredientsService {

    ingredients: Ingredient[] = [];
    recipes: Candidate[];
    startedEditing = new Subject<number>();

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

    public getIngredient(index: number) {
        return this.ingredients[index];
    }

    public replaceIngredient(index: number, ing: Ingredient) {
        this.ingredients[index] = ing;
    }

    public deleteItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    public clearList() {
        this.ingredients.splice(0);
    }

    public getTotal() {
        return this.ingredients.length;
    }

    public setList(list: Ingredient[]) {
        this.ingredients = list;
    }
}
