import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorDisplayComponent } from 'src/app/shared/error-display/error-display.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';


@NgModule({
    declarations: [
        AuthComponent,
        LoadingSpinnerComponent,
        ErrorDisplayComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        AuthRoutingModule
    ],
})
export class AuthModule {

}
