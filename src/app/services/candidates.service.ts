import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { Authservice } from '../components/auth/auth.service';
import { Candidate } from '../shared/candidate.model';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class CandidateService implements OnDestroy {

    recipeSelected = new EventEmitter<Candidate>();
    private errorMsg = null;
    private candidatesList: AngularFireList<Candidate>;
    private candidatesObs: Observable<AngularFireAction<DatabaseSnapshot<Candidate>>[]>;
    private candidates: AngularFireAction<DatabaseSnapshot<Candidate>>[];

    subscription: Subscription;

    constructor(private logger: LoggerService, private http: HttpClient, private auth: Authservice, private db: AngularFireDatabase) {
        this.candidatesList = db.list('candidates');
        this.candidatesObs = db.list<Candidate>('candidates').snapshotChanges();
        this.candidatesObs.subscribe(
            (candidates) => {
                this.candidates = candidates;
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchCandidates() {
        return this.candidatesList.query.orderByChild('ispublic').equalTo(true);
    }

    fetchUserCandidates() {
        return this.candidatesList.query.orderByChild('owner').equalTo(this.auth.currentUserId);
    }

    upVote(key: string) {
        const addUpvote = this.db.list('candidates/' + key + '/votes/' + this.auth.currentUserId);
        addUpvote.set('value', true);
    }

    downVote(key: string) {
        const addUpvote = this.db.list('candidates/' + key + '/votes/' + this.auth.currentUserId);
        addUpvote.set('value', false);
    }

    registerNewCandidate(candidate: Candidate) {
        this.candidatesList.push(candidate);
    }

    updateCandidate(candidate: Candidate, key: string) {
        this.candidatesList.update(key, candidate);
    }

    publishCandidate(key:string){
        const publish = this.db.list('candidates/' + key);
        publish.set('ispublic',true);
    }

    privateCandidate(key:string){
        const publish = this.db.list('candidates/' + key);
        publish.set('ispublic',false);
    }

    getCandidate(key: string) {
        return this.candidates.find((candidate) => candidate.key === key );
    }

    deleteCandidate(key: string) {
        this.candidatesList.remove(key);
    }

    getTotal(): number {
        return this.candidates.length;
    }

    getUserTotal(): number {
        return this.candidates.length;
    }

    error() {
        return this.errorMsg;
    }
}
