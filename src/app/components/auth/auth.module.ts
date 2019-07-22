import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { ErrorDisplayComponent } from 'src/app/shared/error-display/error-display.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';


@NgModule({
    declarations: [
        AuthComponent,
        LoadingSpinnerComponent,
        ErrorDisplayComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        AuthRoutingModule,
        AngularFireModule,
    ],
})
export class AuthModule {

}
