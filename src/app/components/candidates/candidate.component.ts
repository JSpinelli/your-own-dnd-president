import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../shared/candidate.model';
import { CandidateService } from '../../services/candidates.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidatesComponent implements OnInit {

  recipe: Candidate = null;
  errorMsg = null;
  loading = true;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.recipeSelected.subscribe(
      (recipe: Candidate) => {
        this.recipe = recipe;
      }
    );
    this.errorMsg = this.candidateService.error();
  }

}
