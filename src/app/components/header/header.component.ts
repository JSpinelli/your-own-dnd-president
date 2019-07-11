import { Component, Output, EventEmitter } from '@angular/core';
import { Authservice } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private authService: Authservice) { }

    collapsed = true;

    @Output() headerClick = new EventEmitter<number>();

    onRecipeClick() {
        this.headerClick.emit(0);
    }

    onShoppingClick() {
        this.headerClick.emit(1);
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }
}
