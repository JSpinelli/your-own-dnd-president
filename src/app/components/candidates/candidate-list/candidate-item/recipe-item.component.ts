import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { CandidateService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() id: number;
  @Output() recipeClick = new EventEmitter<void>();

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
  }

}
