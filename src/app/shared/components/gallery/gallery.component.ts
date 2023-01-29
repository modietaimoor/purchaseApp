import { Component, Input } from '@angular/core';
import { PhotoModel } from '@domain/models/products';
import { Size } from '@shared/size';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  @Input() dataSource: PhotoModel[];
  @Input() title: string = '';
  @Input() slideshowDelay: number = 0;
  @Input() loop: boolean = true;
  @Input() showIndicator: boolean = true;
  @Input() showNavButtons: boolean = true;
  @Input() size: Size =  { height: 350, width: 400 };
  constructor() {}
}
