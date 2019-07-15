import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { CandidateService } from 'src/app/services/candidates.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  @Input() recipeToDisplay: Recipe;
  @Input() id: number;
  subscription: Subscription;

  constructor(
    private candServ: CandidateService,
    private candMatchServ: IngredientsService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.recipeToDisplay = data.candidate;
        }
      );
    this.id = this.route.snapshot.params.id;
  }

  ngOnDestroy() {
  }

  AddIngredients() {
    this.recipeToDisplay.ingredients.forEach(element => {
      this.candMatchServ.addIngredient(element);
    });
  }
  nextCandidate() {
    this.router.navigate(['/recipes', ++this.id]);
  }

  deleteCandidate() {
    this.candServ.deleteCandidate(this.id);
  }
}
