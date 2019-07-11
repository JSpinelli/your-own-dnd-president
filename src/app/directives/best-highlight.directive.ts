import { Directive, Renderer2, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBestHighlight]'
})
export class BestHighlightDirective implements OnInit {


  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
  }
  @HostListener('mouseenter') mouseOver(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#B0DBEB');
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
  }

}
