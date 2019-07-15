import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CandidateService {

    recipeSelected = new EventEmitter<Recipe>();
    // private candidates: { candidate: Recipe, id: string }[] = [];
    private candidates: Recipe[] = [];
    private url = 'https://your-own-dnd-president.firebaseio.com/candidates';
    private errorMsg = null;

    constructor(private logger: LoggerService, private http: HttpClient) {

        http.get(this.url+'.json')
            .pipe(map(responseData => {
                const candidatesArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        candidatesArray.push({ ...responseData[key], id: key });
                    }
                }
                return candidatesArray;
            })
            ).subscribe(
                responseData => {
                    console.log(responseData);
                    this.candidates.push(...responseData);
                },
                error => {
                    console.log("ERROR"+error);
                    this.errorMsg = 'There has been an error retrieving the candidates list, Sorry';
                }
            );
    }

    registerNewCandidate(candidate: Recipe) {
        this.logger.log(candidate.name);
        this.candidates.push(candidate);
        this.http.post(this.url + '.json', candidate)
            .subscribe(
                responseData => {
                    console.log('Post data ' + responseData);
                }
            );
    }

    getCandidates() {
        return this.candidates;
    }

    updateCandidate(candidate: Recipe, index: number) {
        this.candidates[index] = candidate;
    }

    getCandidate(index: number) {
        return this.candidates[index];
    }

    deleteCandidate(index: number) {
        this.http.delete(this.url + '/' + this.candidates[index].id + '.json').subscribe(
            responseData => { console.log('This is the response ' + responseData); }
        );
        this.candidates.splice(index, 1);
    }

    error(){
        return this.errorMsg;
    }
}
