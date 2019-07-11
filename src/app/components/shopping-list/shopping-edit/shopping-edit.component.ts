import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { CandidateMatchService } from 'src/app/services/candidateMatch.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit {

  @Output() newIngredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('name', { static: false }) ingredientName: ElementRef;
  @ViewChild('amount', { static: false }) ingredientAmount: ElementRef;
  @ViewChild('description', { static: false }) ingredientDesc: ElementRef;

  constructor(private candidateMatch: CandidateMatchService) { }

  ngOnInit() {
  }

  onIngredientAdded() {
    const ingredientToAdd = new Ingredient(
      this.ingredientName.nativeElement.value,
      this.ingredientDesc.nativeElement.value,
      this.ingredientAmount.nativeElement.value);
    this.candidateMatch.addIngredient(ingredientToAdd);
  }

  deleteSelected() {
    this.candidateMatch.deleteItem();
  }

  clearItems() {
    this.candidateMatch.clearList();
  }
}
