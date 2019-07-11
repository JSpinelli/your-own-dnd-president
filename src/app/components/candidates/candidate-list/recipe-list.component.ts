import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { CandidateService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  candidates: Recipe[];

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidates = this.candidateService.candidates;
  }

  onRecipeAdded() {

  }

}
