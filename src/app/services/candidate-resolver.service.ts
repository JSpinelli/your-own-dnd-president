import { Injectable } from '@angular/core';
import { Candidate } from '../shared/candidate.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CandidateService } from './candidates.service';
import { Observable } from 'rxjs';

@Injectable()
export class CandidateResolver implements Resolve<Candidate>{

    id: number;

    constructor(private candidateService: CandidateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Candidate> | Promise<Candidate> | Candidate {
        
        return this.candidateService.getCandidate(route.params.id);
    }

}