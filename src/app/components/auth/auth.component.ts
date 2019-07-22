import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from './auth.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})

export class AuthComponent implements OnInit {

    logInMode = true;
    isLoading = false;
    errorMessage = null;
    testing = true;

    //authObs: Observable<AuthResponseData>;
    authObs: Observable<firebase.User>;

    constructor(private auth: Authservice, private router: Router, private afAuth: AngularFireAuth) {

    }

    ngOnInit() {
        // if (this.auth.autoLogin()) {
        //     this.router.navigate(['/candidates']);
        // }
    }

    switchMode() {
        this.logInMode = !this.logInMode;
    }

    // onSubmit(form: NgForm) {
    //     let email;
    //     let password;
    //     if (this.testing) {
    //         email = 'asd@asd.com';
    //         password = 'asdasd';
    //     } else {
    //         if (!form.valid) {
    //             return;
    //         }
    //         email = form.value.email;
    //         password = form.value.password;
    //     }

    //     this.isLoading = true;
    //     if (this.logInMode) {
    //         this.authObs = this.auth.signIn(email, password);
    //     } else {
    //         this.authObs = this.auth.signUp(email, password);
    //     }
    //     this.authObs.subscribe(
    //         () => {
    //             this.isLoading = false;
    //             this.router.navigate(['/candidates']);
    //         },
    //         errorRes => {
    //             this.errorMessage = errorRes;
    //             this.isLoading = false;
    //         });
    //     form.reset();
    // }

    async onSubmit(form: NgForm) {
        let email;
        let password;
        if (this.testing) {
            email = 'asd@asd.com';
            password = 'asdasd';
        } else {
            if (!form.valid) {
                return;
            }
            email = form.value.email;
            password = form.value.password;
        }
        let error;
        if (this.logInMode) {
            error =  await this.auth.signIn(email, password);
        } else {
            error = await this.auth.signUp(email, password);
        }
        if (this.auth.authenticated){
            this.router.navigate(['/candidates']);
        }
        form.reset();
    }

}