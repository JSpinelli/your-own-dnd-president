import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidate.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { CandidateDetailComponent } from './components/candidates/candidate-detail/candidate-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AuthGuard } from './components/auth/auth.guard';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CandidateResolver } from './services/candidate-resolver.service';
import { AuthComponent } from './components/auth/auth.component';

const appRoutes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'candidates', canActivate: [AuthGuard], component: CandidatesComponent },
    { path: 'add-candidate', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: CandidateAddComponent },
    { path: 'edit-candidate/:id', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: CandidateAddComponent },
    { path: 'candidate/:id', canActivate: [AuthGuard], component: CandidateDetailComponent, resolve: { candidate: CandidateResolver } },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '', canActivate: [AuthGuard], component: CandidatesComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
