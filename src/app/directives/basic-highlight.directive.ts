import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {
    constructor(private elementRef: ElementRef) { }
    
    ngOnInit(){
        //DONT DO THIS
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}