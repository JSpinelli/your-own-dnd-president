import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/candidates/recipes.component';
import { RecipeListComponent } from './components/candidates/candidate-list/recipe-list.component';
import { RecipeDetailComponent } from './components/candidates/candidate-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/candidates/candidate-list/candidate-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BestHighlightDirective } from './directives/best-highlight.directive';
import { DropddownDirective } from './shared/dropdown.directive';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { Authservice } from './services/auth.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CandidateResolver } from './services/candidate-resolver.service';
import { CandidateService } from './services/candidates.service';
import { CandidateMatchService } from './services/candidateMatch.service';
import { LoggerService } from './services/logger.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    BasicHighlightDirective,
    BestHighlightDirective,
    DropddownDirective,
    CandidateAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, Authservice, CanDeactivateGuard, CandidateResolver, CandidateService, CandidateMatchService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
