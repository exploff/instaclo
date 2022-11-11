import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) { }

  @Output() public clickedOutside = new EventEmitter();
  @HostListener('document:click', ['$event.target'])
  public onPageClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickedOutside.emit(target);
    }
  }

}
