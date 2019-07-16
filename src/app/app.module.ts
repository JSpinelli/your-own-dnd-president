import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BestHighlightDirective } from './directives/best-highlight.directive';
import { DropddownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app.routing.module';
import { ShortenPipe } from './pipes/shorten.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthIntercetorService } from './components/auth/auth-interceptor.service';
import { ShoppingListModule } from './components/shopping-list/shopping-list.module';
import {AuthModule} from './components/auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasicHighlightDirective,
    BestHighlightDirective,
    DropddownDirective,
    ShortenPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercetorService, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
