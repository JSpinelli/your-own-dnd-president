import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../shared/candidate.model';
import { CandidateService } from '../../../services/candidates.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-candidate-vote',
  templateUrl: './candidate-vote.component.html',
  styleUrls: ['./candidate-vote.component.css'],
})
export class CandidateVoteComponent implements OnInit {

  candidates: Candidate[];
  errorMsg = null;
  loading = true;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.fetchCandidates().pipe(take(1)).subscribe(
        responseData => {
            console.log("Candidates Fetched");
            const newCandidates = [];
            newCandidates.push(...responseData);
            this.candidates = newCandidates;
        },
        error => {
            console.log('Error: ' + error);
            this.errorMsg = 'There has been an error retrieving the candidates list, Sorry';
        }
    );
  }

}
