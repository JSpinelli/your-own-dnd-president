import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/candidates/recipes.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { RecipeDetailComponent } from './components/candidates/candidate-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AuthGuard } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CandidateResolver } from './services/candidate-resolver.service';

const appRoutes: Routes = [
    { path: 'recipes', component: RecipesComponent },
    //{ path: 'add-recipe', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: CandidateAddComponent },
    { path: 'add-recipe', component: CandidateAddComponent },
    { path: 'add-recipe/:id', component: CandidateAddComponent },
    { path: 'recipes/:id', component: RecipeDetailComponent, resolve: {candidate: CandidateResolver} },
    { path: '', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
