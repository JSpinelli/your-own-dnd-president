import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'candidates', loadChildren: './components/candidates/candidates.module#CandidatesModule' },
    { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule' },
    { path: 'shopping-list', loadChildren: './components/shopping-list/shopping-list.module#ShoppingListModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
