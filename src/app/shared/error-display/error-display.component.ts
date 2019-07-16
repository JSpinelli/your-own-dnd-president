import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error-display',
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css'],
})

export class ErrorDisplayComponent {

    @Output() closeEvent= new EventEmitter<void>();

    @Input() errorMessage:string;

    onClose(){
        this.closeEvent.emit();
    }

}
