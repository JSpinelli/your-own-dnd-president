import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidate.component';
import { AuthGuard } from '../auth/auth.guard';
import { CanDeactivateGuard } from 'src/app/services/can-deactivate-guard.service';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';
import { CandidateResolver } from 'src/app/services/candidate-resolver.service';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidatesListComponent } from './candidate-list/candidate-list.component';
import { CandidateVoteComponent } from './candidate-vote/candidate-vote.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CandidatesComponent,
        children: [
            { path: '', component: CandidateVoteComponent },
            { path: 'my-candidates', component: CandidatesListComponent},
            { path: 'add', canDeactivate: [CanDeactivateGuard], component: CandidateAddComponent },
            { path: 'edit/:id', canDeactivate: [CanDeactivateGuard], component: CandidateAddComponent },
            { path: ':id', component: CandidateDetailComponent, resolve: { candidate: CandidateResolver } },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CandidatesRoutingModule { }
