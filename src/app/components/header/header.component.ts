import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Authservice } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuth=false;
    private userSub: Subscription;

    constructor(private afAuth: AngularFireAuth, private auth: Authservice) { }

    collapsed = true;

    @Output() headerClick = new EventEmitter<number>();

    ngOnInit() {
        this.userSub =  this.afAuth.authState.subscribe(
            user => {
                console.log(user);
                this.isAuth = !!user;
            }
        );
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onRecipeClick() {
        this.headerClick.emit(0);
    }

    onShoppingClick() {
        this.headerClick.emit(1);
    }

    logout() {
        this.auth.signOut();
    }
}
