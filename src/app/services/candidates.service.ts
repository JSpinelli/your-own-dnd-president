import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from '../shared/candidate.model';
import { LoggerService } from './logger.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Authservice } from '../components/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CandidateService {

    recipeSelected = new EventEmitter<Candidate>();
    private userCandidates: Candidate[] = [];
    private allCandidates: Candidate[] = [];
    private url = environment.firebaseURL;
    private errorMsg = null;

    constructor(private logger: LoggerService, private http: HttpClient, private auth: Authservice) { }

    fetchCandidates() {
        return this.http.get(this.url + '.json').pipe(
            map(responseData => {
                const candidatesArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        const candidateToAdd: Candidate = { ...responseData[key] };
                        candidateToAdd.id = key;
                        candidatesArray.push(candidateToAdd);
                    }
                }
                this.allCandidates = candidatesArray;
                return this.allCandidates;
            }));
    }

    upVote(id: number) {
        this.http.patch(
            this.url + '/' + this.allCandidates[id].id + '/votes/' + this.userCandidates[id].votes.length + '.json',
             { id: this.auth.user.getValue().id, value: true })
            .subscribe(
                responseData => {
                    console.log('Patch data ' + responseData);
                }
            );
    }

    downVote(id: number) {
        this.http.patch(
            this.url + '/' + this.allCandidates[id].id + '/votes/' + this.userCandidates[id].votes.length + '.json', 
            { id: this.auth.user.getValue().id, value: false })
            .subscribe(
                responseData => {
                    console.log('Patch data ' + responseData);
                }
            );
    }

    registerNewCandidate(candidate: Candidate) {
        this.http.post(this.url + '.json', candidate)
            .subscribe(
                responseData => {
                    console.log('Post data ' + responseData);
                }
            );
    }

    updateCandidate(candidate: Candidate, index: number) {
        this.http.patch(this.url + '/' + this.allCandidates[index].id + '.json', candidate)
            .subscribe(
                responseData => {
                    console.log('Patch data ' + responseData);
                }
            );
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

    getUserTotal():number{
        return this.userCandidates.length;
    }

    error() {
        return this.errorMsg;
    }

    fetchUserCandidates(){
        return this.http.get(this.url +'.json',
            { params: new HttpParams().set('orderBy','"owner"').append('equalTo','"'+this.auth.user.getValue().id+'"')})
            .pipe(
                map(responseData => {
                const candidatesArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        let candidateToAdd: Candidate = { ...responseData[key] };
                        candidateToAdd.id = key;
                        candidatesArray.push(candidateToAdd);
                        console.log(candidateToAdd);
                    }
                }
                this.userCandidates = candidatesArray;
                //console.log("First candidate "+this.userCandidates[0].name+ ' Votes ' + this.userCandidates[0].votes[1].id);
                return this.userCandidates;
            }));
    }
}
