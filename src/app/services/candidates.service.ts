import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { LoggerService } from './logger.service';

@Injectable()
export class CandidateService {

    recipeSelected = new EventEmitter<Recipe>();
    private mockIngre1: Ingredient[] = [
        new Ingredient('Tomatoes', 'Juicy', 5),
        new Ingredient('Fun', 'Juicy', 1000),
        new Ingredient('Rule of Cool', 'Juicy', 99)];
    private mockIngre2: Ingredient[] = [
        new Ingredient('RAW', 'Not fun', 2),
        new Ingredient('Sad Deaths', 'Vax cof cof', 54),
        new Ingredient('Sad Bois', 'Fire guy', 9)];

    constructor(private logger: LoggerService) { }

    public candidates: Recipe[] = [
        // tslint:disable-next-line: max-line-length
        new Recipe('Sam', 'The best', 'https://vignette.wikia.nocookie.net/disney/images/9/9c/Sam_Riegel.jpg/revision/latest?cb=20180831203535', this.mockIngre1),
        // tslint:disable-next-line: max-line-length
        new Recipe('Liam', 'The best', 'https://vignette.wikia.nocookie.net/disney/images/9/95/Liam_O%27Brien.jpg/revision/latest?cb=20180812015101', this.mockIngre2),
    ];

    registerNewCandidate(candidate: Recipe) {
        this.logger.log(candidate.name);
        this.candidates.push(candidate);
    }

    getCandidate(index: number) {
        return this.candidates[index];
    }
    // deleteCandidate(candiate: Recipe){
    //     this.candidates.
    // }
}
