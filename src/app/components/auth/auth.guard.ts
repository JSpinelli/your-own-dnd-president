import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: Authservice, private router: Router, private afAuth: AngularFireAuth) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree {
        this.authService.autoLogin();
        if (this.authService.currentUser != null) {
            return true;
        } else {
           return this.router.createUrlTree(['/auth']);
        }
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    //     Observable<boolean | UrlTree> |
    //     Promise<boolean | UrlTree> |
    //     boolean |
    //     UrlTree {
    //     this.authService.autoLogin();
    //     return this.authService.user.pipe(take(1), map(user => {
    //         const isAuth = !!user;
    //         if (isAuth) {
    //             return true;
    //         } else {
    //             return this.router.createUrlTree(['/auth']);
    //         }
    //     }));
    // }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean |
        UrlTree {
        return this.canActivate(route, state);
    }
}
