import { Component, OnInit } from '@angular/core';
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { CandidateService } from '../../../services/candidates.service';
import { Candidate } from '../../../shared/candidate.model';

@Component({
  selector: 'app-candidate-vote',
  templateUrl: './candidate-vote.component.html',
  styleUrls: ['./candidate-vote.component.css'],
})
export class CandidateVoteComponent implements OnInit {

  candidates: AngularFireAction<DatabaseSnapshot<Candidate>>[];
  errorMsg = null;
  loading = true;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.fetchCandidates().subscribe(
        responseData => {
            this.candidates = responseData;
        },
        error => {
            console.log('Error: ' + error);
            this.errorMsg = 'There has been an error retrieving the candidates list, Sorry';
        }
    );
  }
  

}
