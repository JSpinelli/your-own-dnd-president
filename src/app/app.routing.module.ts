import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidate.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthComponent } from './components/auth/auth.component';

const appRoutes: Routes = [
    { path: '', canActivate: [AuthGuard], component: AuthComponent },
    { path: 'candidates', loadChildren: './components/candidates/candidates.module#CandidatesModule' },
    //{ path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
