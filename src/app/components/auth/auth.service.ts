import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, Subject, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class Authservice {

    authState: Subject<firebase.User> = new Subject<firebase.User>();

    constructor(private http: HttpClient, private router: Router, private firebaseAuth: AngularFireAuth) {

        this.firebaseAuth.authState.subscribe((auth) => {
            this.authState.next(auth);
        });
    }

    signIn(userEmail: string, userPass: string) {
        return this.firebaseAuth.auth.signInWithEmailAndPassword(userEmail, userPass)
            .then(
                credential => {
                    this.authState.next(credential.user);
                })
            .catch(
                err => {
                    this.errorResolver(err);
                }
            );
    }

    signUp(email: string, password: string) {
        return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((credential) => {
                this.authState.next(credential.user);
            })
            .catch(error => console.log(error));
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => console.log("email sent"))
            .catch((error) => console.log(error))
    }


    signOut(): void {
        this.firebaseAuth.auth.signOut();
        this.authState.complete();
        this.router.navigate(['/']);
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get currentUserId(): string {
        let id: string;
        if (this.authenticated) {
            this.authState.pipe(take(1), map((user) => {
                id = user.uid;
            }));
        } else {
            id = '';
        }
        return id;
    }

    // Returns current user data
    get currentUser(): firebase.User {
        let user: firebase.User;
        if (this.authenticated) {
            this.authState.pipe(take(1), map((userF) => {
                user = userF;
            }));
        } else {
            user = null;
        }
        return user;
    }

    // Returns
    get currentUserObservable(): Observable<firebase.User> {
        return this.firebaseAuth.authState;
    }

    // Anonymous User
    get currentUserAnonymous(): boolean {
        let isAnon: boolean;
        if (this.authenticated) {
            this.authState.pipe(take(1), map((user) => {
                isAnon = user.isAnonymous;
            }));
        } else {
            isAnon = null;
        }
        return isAnon;
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.authState) {
            return 'Guest';
        } else if (this.currentUserAnonymous) {
            return 'Anonymous';
        } else {
            let name: string;
            if (this.authenticated) {
                this.authState.pipe(take(1), map((user) => {
                    name = user.displayName;
                }));
            } else {
                name = null;
            }
            return name || 'User without a Name';
        }
    }

    //// Social Auth ////

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        return this.socialSignIn(provider);
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.socialSignIn(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.socialSignIn(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.socialSignIn(provider);
    }

    private socialSignIn(provider) {
        return this.firebaseAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.authState.next(credential.user);
            })
            .catch(error => console.log(error));
    }


    //// Anonymous Auth ////

    anonymousLogin() {
        return this.firebaseAuth.auth.signInAnonymously()
            .then((credential) => {
                this.authState.next(credential.user);
            })
            .catch(error => console.log(error));
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

    // OLD ATUH SERVICE

    // signUp(userEmail: string, userPass: string) {
    //     return this.http.post<AuthResponseData>(
    //         this.signUp_URL,
    //         {
    //             email: userEmail,
    //             password: userPass,
    //             returnSecureToken: true
    //         }
    //     ).pipe(
    //         catchError(errorRes => this.errorResolver(errorRes)),
    //         tap(resData => this.authUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    //     );
    // }

    // private authUser(email: string, localId: string, idToken: string, expiresIn: number) {
    //     console.log(email + localId + idToken);
    //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //     const user = new User(email, localId, idToken, expirationDate);
    //     this.user.next(user);
    //     this.autoLogout(expiresIn * 1000);
    //     localStorage.setItem('userData', JSON.stringify(user));
    // }

    // autoLogin() {
    //     const userData: {
    //         email: string,
    //         id: string,
    //         _token: string,
    //         _tokenExpirationDate: string
    //     } = JSON.parse(localStorage.getItem('userData'));
    //     if (!userData) {
    //         return false;
    //     } else {
    //         const loadedUser = new User(
    //             userData.email,
    //             userData.id,
    //             userData._token,
    //             new Date(userData._tokenExpirationDate));
    //         if (loadedUser.token) {
    //             const currentDate = new Date().getTime();
    //             const previousExp = new Date(userData._tokenExpirationDate).getTime();
    //             const newExpiration = previousExp - currentDate;
    //             this.autoLogout(newExpiration);
    //             this.user.next(loadedUser);
    //             return true;
    //         }
    //         return false;
    //     }
    // }

    // logout() {
    //     this.user.next(null);
    //     localStorage.removeItem('userData');
    //     this.router.navigate(['/auth']);
    //     if (this.tokenExpirationTimer) {
    //         clearTimeout(this.tokenExpirationTimer);
    //     }
    //     this.tokenExpirationTimer = null;
    // }

    // autoLogout(expirationTime: number) {
    //     this.tokenExpirationTimer = setTimeout(() => {
    //         this.logout();
    //     }, expirationTime);
    // }

    // isAuthenticated() {
    //     return this.user ? true : false;
    // }

    // signIn(userEmail: string, userPass: string) {
    //     return this.http.post<AuthResponseData>(
    //         this.signIn_URL,
    //         {
    //             email: userEmail,
    //             password: userPass,
    //             returnSecureToken: true
    //         }
    //     ).pipe(
    //         catchError(errorRes => this.errorResolver(errorRes)),
    //         tap(resData => this.authUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    //     );
    // }
}
