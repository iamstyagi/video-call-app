import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective {
  @Input()
  public set appAutoFocus(value) {
    
    if (value) {
      this.host.nativeElement.focus();
    }
  }

  public constructor(
    private host: ElementRef,
    
  ) {

  }
}
