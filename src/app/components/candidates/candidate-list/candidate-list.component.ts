import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CandidateService } from 'src/app/services/candidates.service';
import { Candidate } from 'src/app/shared/candidate.model';
import { Authservice } from '../../auth/auth.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidatesListComponent implements OnInit {

  candidates: Candidate[];
  errorMsg = null;
  isLoading = false;
  
  constructor(private candidateService: CandidateService, private route: ActivatedRoute, private auth:Authservice) { }

  ngOnInit() {
    this.candidateService.fetchCandidates().pipe(take(1)).subscribe(
      responseData => {
          this.candidates = responseData;
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
