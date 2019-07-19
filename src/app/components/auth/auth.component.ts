import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

    authObs: Observable<AuthResponseData>;
    //authObs: Observable<firebase.User>;

    constructor(private auth: Authservice, private router: Router, private afAuth: AngularFireAuth) {

    }

    ngOnInit() {
        if (this.auth.autoLogin()) {
            this.router.navigate(['/candidates']);
        }
    }

    switchMode() {
        this.logInMode = !this.logInMode;
    }

    onSubmit(form: NgForm) {
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

        this.isLoading = true;
        if (this.logInMode) {
            this.authObs = this.auth.signIn(email, password);
        } else {
            this.authObs = this.auth.signUp(email, password);
        }
        this.authObs.subscribe(
            () => {
                this.isLoading = false;
                this.router.navigate(['/candidates']);
            },
            errorRes => {
                this.errorMessage = errorRes;
                this.isLoading = false;
            });
        form.reset();
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
    //     if (this.logInMode) {
    //         this.auth.signIn(email, password).subscribe(
    //             () => {
    //                 this.isLoading = false;
    //                 this.router.navigate(['/candidates']);
    //             }
    //         );
    //     } else {
    //         this.authObs = this.auth.signUp(email, password);
    //     }
    //     form.reset();
    // }

}