import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CandidatesComponent } from './components/candidates/candidate.component';
import { CandidatesListComponent } from './components/candidates/candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './components/candidates/candidate-detail/candidate-detail.component';
import { CandidateItemComponent } from './components/candidates/candidate-list/candidate-item/candidate-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BestHighlightDirective } from './directives/best-highlight.directive';
import { DropddownDirective } from './shared/dropdown.directive';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './components/auth/auth.guard';
import { Authservice } from './components/auth/auth.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CandidateResolver } from './services/candidate-resolver.service';
import { CandidateService } from './services/candidates.service';
import { IngredientsService } from './services/ingredients.service';
import { LoggerService } from './services/logger.service';
import { ShortenPipe } from './pipes/shorten.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorDisplayComponent } from './shared/error-display/error-display.component';
import { AuthIntercetorService } from './components/auth/auth-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CandidatesComponent,
    CandidatesListComponent,
    CandidateDetailComponent,
    CandidateItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    BasicHighlightDirective,
    BestHighlightDirective,
    DropddownDirective,
    CandidateAddComponent,
    ShortenPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    ErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    Authservice,
    CanDeactivateGuard,
    CandidateResolver,
    CandidateService,
    IngredientsService,
    LoggerService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercetorService, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
