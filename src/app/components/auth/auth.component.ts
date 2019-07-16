import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

    constructor(private auth: Authservice, private router: Router) {

    }

    ngOnInit() {

    }

    switchMode() {
        this.logInMode = !this.logInMode;
    }

    onSubmit(form: NgForm) {
        console.log('SUBMIT');
        let email;
        let password ;
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
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/candidates']);
            },
            errorRes => {
                console.log(errorRes);
                this.errorMessage = errorRes;
                this.isLoading = false;
            });
        form.reset();
    }

}