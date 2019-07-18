import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/shared/candidate.model';
import { CandidateService } from 'src/app/services/candidates.service';
import { ActivatedRoute, Data } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidatesListComponent implements OnInit {

  candidates: Candidate[];
  errorMsg = null;
  isLoading = false;
  
  constructor(private candidateService: CandidateService, private route: ActivatedRoute) { }

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

  showAmount(){
    console.log(this.candidates.length);
  }

}
