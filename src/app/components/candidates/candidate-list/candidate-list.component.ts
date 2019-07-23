import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidates.service';
import { Authservice } from '../../auth/auth.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidatesListComponent implements OnInit {

  candidates: DataSnapshot[];
  errorMsg = null;
  isLoading = false;

  constructor(private candidateService: CandidateService, private route: ActivatedRoute, private auth: Authservice) { }

  ngOnInit() {
    this.candidateService.fetchUserCandidates().on('value',
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

  showAmount() {
    console.log(this.candidates.length);
  }

}
