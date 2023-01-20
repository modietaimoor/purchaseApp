import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIconBrokenSign]'
})
export class IconBrokenSignDirectionDirective implements OnChanges {
  @Input() appIconBrokenSign: boolean;
  broken = 'img/icons/broken.png';
  unBroken = 'img/icons/unBroken.png';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.addSrcImage();
  }

  addSrcImage(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'src',
      this.appIconBrokenSign ? this.broken : this.unBroken
    );
  }
}
