import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthModule } from './components/auth/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BestHighlightDirective } from './directives/best-highlight.directive';
import { DropddownDirective } from './shared/dropdown.directive';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasicHighlightDirective,
    BestHighlightDirective,
    DropddownDirective,
    //ShortenPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    //{provide: HTTP_INTERCEPTORS, useClass: AuthIntercetorService, multi: true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
