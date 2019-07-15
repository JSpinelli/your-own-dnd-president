import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Authservice } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuth=false;
    private userSub: Subscription;

    constructor(private authService: Authservice) { }

    collapsed = true;

    @Output() headerClick = new EventEmitter<number>();

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(
            user => {
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

    logout(){
        this.authService.logout();
    }
}
