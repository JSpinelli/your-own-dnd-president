import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/shared/candidate.model';
import { CandidateService } from 'src/app/services/candidates.service';
import { ActivatedRoute} from '@angular/router';
import { take } from 'rxjs/operators';
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
          console.log("Candidates Fetched");
          const newCandidates = [];
          for (let index = 0; index < responseData.length; index++) {
            if (responseData[index].owner==this.auth.user.getValue().id)
            newCandidates.push(responseData[index]);
          }
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
