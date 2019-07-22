import { Injectable } from '@angular/core';
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Candidate } from '../shared/candidate.model';
import { CandidateService } from './candidates.service';

@Injectable({providedIn: 'root'})
export class CandidateResolver implements Resolve<AngularFireAction<DatabaseSnapshot<Candidate>>> {

    id: number;

    constructor(private candidateService: CandidateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<AngularFireAction<DatabaseSnapshot<Candidate>>> |
        Promise<AngularFireAction<DatabaseSnapshot<Candidate>>> |
        AngularFireAction<DatabaseSnapshot<Candidate>> {
        return this.candidateService.getCandidate(route.params.id);
    }

}
