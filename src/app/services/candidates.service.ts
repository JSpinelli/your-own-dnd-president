import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authservice } from '../components/auth/auth.service';
import { Candidate } from '../shared/candidate.model';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class CandidateService {

    recipeSelected = new EventEmitter<Candidate>();
    private userCandidates: Candidate[] = [];
    private allCandidates: AngularFireAction<DatabaseSnapshot<Candidate>>[];
    private url = environment.firebaseURL;
    private errorMsg = null;
    private candidatesList: AngularFireList<Candidate>;
    private candidates: Observable<AngularFireAction<DatabaseSnapshot<Candidate>>[]>;
    subscription: Subscription;

    constructor(private logger: LoggerService, private http: HttpClient, private auth: Authservice, private db: AngularFireDatabase) {
        this.candidatesList = db.list('candidates');
        this.candidates = db.list<Candidate>('candidates').snapshotChanges();
    }
    fetchCandidates() {
        return this.candidates;
    }

    upVote(key: string) {
        const addUpvote = this.db.list('candidates/' + key + '/votes');
        addUpvote.set(this.auth.currentUserId, {value: true});
    }

    downVote(key: string) {
        const addUpvote = this.db.list('candidates/' + key + '/votes');
        addUpvote.set(this.auth.currentUserId, {value: false});
    }

    registerNewCandidate(candidate: Candidate) {
        this.candidatesList.push(candidate);
    }

    updateCandidate(candidate: Candidate, key: string) {
        this.candidatesList.update(key, candidate);
    }

    getCandidate(index: number) {
        return this.allCandidates[index];
    }

    deleteCandidate(index: number) {
        this.http.delete(this.url + '/' + this.allCandidates[index].id + '.json').subscribe(
            responseData => { console.log('This is the response ' + responseData); }
        );
        this.allCandidates.splice(index, 1);
    }

    getTotal(): number {
        return this.allCandidates.length;
    }

    getUserTotal(): number {
        return this.userCandidates.length;
    }

    error() {
        return this.errorMsg;
    }

    // fetchUserCandidates() {
    //     return this.http.get(this.url + '.json',
    //         { params: new HttpParams().set('orderBy', '"owner"').append('equalTo', '"' + this.auth.user.getValue().id + '"') })
    //         .pipe(
    //             map(responseData => {
    //                 const candidatesArray = [];
    //                 for (const key in responseData) {
    //                     if (responseData.hasOwnProperty(key)) {
    //                         let candidateToAdd: Candidate = { ...responseData[key] };
    //                         candidateToAdd.id = key;
    //                         candidatesArray.push(candidateToAdd);
    //                         console.log(candidateToAdd);
    //                     }
    //                 }
    //                 this.userCandidates = candidatesArray;
    //                 //console.log("First candidate "+this.userCandidates[0].name+ ' Votes ' + this.userCandidates[0].votes[1].id);
    //                 return this.userCandidates;
    //             }));
    // }
}
