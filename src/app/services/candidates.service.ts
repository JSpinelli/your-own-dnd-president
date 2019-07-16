import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from '../shared/candidate.model';
import { LoggerService } from './logger.service';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Authservice } from '../components/auth/auth.service';

@Injectable({providedIn: 'root'})
export class CandidateService {

    recipeSelected = new EventEmitter<Candidate>();
    private candidates: Candidate[] = [];
    private url = 'https://your-own-dnd-president.firebaseio.com/candidates';
    private errorMsg = null;

    constructor(private logger: LoggerService, private http: HttpClient, private auth: Authservice) {}

    fetchCandidates() {
        return this.http.get(this.url + '.json').pipe(
                map(responseData => {
                    const candidatesArray = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            candidatesArray.push({ ...responseData[key], id: key });
                        }
                    }
                    this.candidates = candidatesArray;
                    return candidatesArray;
                }));
    }

    registerNewCandidate(candidate: Candidate) {
        this.candidates.push(candidate);
        this.http.post(this.url + '.json', candidate)
            .subscribe(
                responseData => {
                    console.log('Post data ' + responseData);
                }
            );
    }

    updateCandidate(candidate: Candidate, index: number) {
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

    getTotal(): number {
        return this.candidates.length;
    }

    error() {
        return this.errorMsg;
    }
}
