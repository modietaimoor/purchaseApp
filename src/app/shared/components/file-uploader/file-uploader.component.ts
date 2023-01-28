import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxFileUploaderComponent } from 'devextreme-angular';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html'
})
export class FileUploaderComponent {
  @ViewChild(DxFileUploaderComponent) fileUploader: DxFileUploaderComponent;
  @Input() allowedFileExtensions: string[];
  @Input() accept: string = '*';
  @Input() showFileList = false;
  @Input() maxFileSize: number = 0;
  @Input() multiple: boolean = true;
  @Input() uploadMode:  'instantly' | 'useButtons' | 'useForm' = 'useForm';
  @Output() readonly valueChanged: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();
  value: Array<File>;

  constructor() {}

  onValueChanged(e: { value: Array<File> }): void {
    this.value = e.value;
    this.valueChanged.emit(this.value);
  }
}
