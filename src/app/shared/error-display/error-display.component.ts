import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error-display',
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css'],
})

export class ErrorDisplayComponent {

    constructor (private router: Router , private route: ActivatedRoute){}

    @Input() errorMessage:string;

    onBack(){
        this.router.navigate(this.route.snapshot.url);
    }

}
