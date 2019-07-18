import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
//import { auth } from 'firebase/app';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class Authservice {

    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer;

    signUp_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+environment.firebaseAPIKey;
    signIn_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+environment.firebaseAPIKey

    constructor(private http: HttpClient, private router: Router, private firebaseAuth: AngularFireAuth) { }

    signIn(userEmail: string, userPass: string) {
        return this.http.post<AuthResponseData>(
            this.signIn_URL,
            {
                email: userEmail,
                password: userPass,
                returnSecureToken: true
            }
        ).pipe(
            catchError(errorRes => this.errorResolver(errorRes)),
            tap(resData => this.authUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }

    // signIn(userEmail: string, userPass: string) {
    //     return this.firebaseAuth.auth.signInWithEmailAndPassword(userEmail,userPass).then(
    //         value => {
    //             console.log('It worked');
    //         })
    //     .catch(
    //         err => {
    //             console.log(err);
    //         }
    //     );
    // }

    signUp(userEmail: string, userPass: string) {
        return this.http.post<AuthResponseData>(
            this.signUp_URL,
            {
                email: userEmail,
                password: userPass,
                returnSecureToken: true
            }
        ).pipe(
            catchError(errorRes => this.errorResolver(errorRes)),
            tap(resData => this.authUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }

    private authUser(email: string, localId: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return false;
        } else {
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                const currentDate = new Date().getTime();
                const previousExp = new Date(userData._tokenExpirationDate).getTime();
                const newExpiration = previousExp - currentDate;
                this.autoLogout(newExpiration);
                this.user.next(loadedUser);
                return true;
            }
            return false;
        }
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationTime: number) {
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout();
        }, expirationTime);
    }

    errorResolver(errorRes) {
        let errorMessage = 'An unkown error has ocurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS': {
                errorMessage = 'This email already exists';
                break;
            }
            case 'EMAIL_NOT_FOUND': {
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            }
            case 'INVALID_PASSWORD': {
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            }
            case 'USER_DISABLED': {
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            }
            case 'OPERATION_NOT_ALLOWED': {
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            }
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            }
        }
        return throwError(errorMessage);
    }

    isAuthenticated() {
        return this.user ? true : false;
    }
}
