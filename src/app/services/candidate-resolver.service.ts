import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CandidateService } from './candidates.service';
import { Observable } from 'rxjs';

@Injectable()
export class CandidateResolver implements Resolve<Recipe>{

    id: number;

    constructor(private candidateService: CandidateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {

        return this.candidateService.candidates[route.params.id];
    }

}