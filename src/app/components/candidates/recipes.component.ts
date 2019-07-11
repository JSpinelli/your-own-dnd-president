import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { CandidateService } from '../../services/candidates.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  recipe: Recipe = null;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );
  }

}
