import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { CandidateService } from '../../../services/candidates.service';

@Component({
  selector: 'app-candidate-vote',
  templateUrl: './candidate-vote.component.html',
  styleUrls: ['./candidate-vote.component.css'],
})
export class CandidateVoteComponent implements OnInit {

  candidates: DataSnapshot[];
  errorMsg = null;
  loading = true;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.fetchCandidates().on('value',
    responseData => {
      const newArray: DataSnapshot[] = [];
      responseData.forEach(
          (candidate) => {
              newArray.push(candidate);
          }
        );
      this.candidates = newArray;
    },
    error => {
        console.log('Error: ' + error);
        this.errorMsg = 'There has been an error retrieving the candidates list, Sorry';
    }
    );
  }

}
