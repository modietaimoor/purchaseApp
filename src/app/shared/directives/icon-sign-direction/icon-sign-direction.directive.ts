import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIconSignDirection]'
})
export class IconSignDirectionDirective implements OnChanges {
  @Input() appIconSignDirection: boolean;
  upImage = 'img/icons/up.png';
  downImage = 'img/icons/down.png';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.addSrcImage();
  }

  addSrcImage(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'src',
      this.appIconSignDirection ? this.upImage : this.downImage
    );
  }
}
