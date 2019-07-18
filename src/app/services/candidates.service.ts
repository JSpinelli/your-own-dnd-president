import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from '../shared/candidate.model';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Authservice } from '../components/auth/auth.service';
import { environment } from 'src/environments/environment';
import { CandidateVote } from '../shared/candidateVote.model';

@Injectable({ providedIn: 'root' })
export class CandidateService {

    recipeSelected = new EventEmitter<Candidate>();
    private candidatesToVote: CandidateVote[] = [];
    private userCandidates: Candidate[] = [];
    private url = environment.firebaseURL;
    private errorMsg = null;

    constructor(private logger: LoggerService, private http: HttpClient, private auth: Authservice) { }

    fetchCandidates() {
        return this.http.get(this.url + '.json').pipe(
                map(responseData => {
                    const candidatesArray = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            candidatesArray.push({ ...responseData[key], id: key });
                        }
                    }
                    this.userCandidates = candidatesArray;
                    return candidatesArray;
                }));
    }
    // fetchCandidates() {
    //     this.http.get('https://your-own-dnd-president.firebaseio.com/candidatesOfUsers' + '.json' + '?key="' + this.auth.user.value.id + '"').pipe(
    //         map(responseData => {
    //             const candidatesOfUser = [];
    //             for (const key in responseData) {
    //                 if (responseData.hasOwnProperty(key)) {
    //                     for (const key2 in responseData[key]) {
    //                         if (responseData[key].hasOwnProperty(key2)) {
    //                             candidatesOfUser.push(key2);
    //                         }
    //                     }
    //                 }
    //             }
    //         }));
    // }

    fetchCandidatesToVote() {

    }

    registerNewCandidate(candidate: Candidate) {
        this.userCandidates.push(candidate);
        this.http.post(this.url + '.json', candidate)
            .subscribe(
                responseData => {
                    console.log('Post data ' + responseData);
                }
            );
    }

    updateCandidate(candidate: Candidate, index: number) {
        this.userCandidates[index] = candidate;
    }

    getCandidate(index: number) {
        return this.userCandidates[index];
    }

    deleteCandidate(index: number) {
        this.http.delete(this.url + '/' + this.userCandidates[index].id + '.json').subscribe(
            responseData => { console.log('This is the response ' + responseData); }
        );
        this.userCandidates.splice(index, 1);
    }

    getTotal(): number {
        return this.userCandidates.length;
    }

    error() {
        return this.errorMsg;
    }
}
