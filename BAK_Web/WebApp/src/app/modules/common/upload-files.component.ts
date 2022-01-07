import { Component, OnInit, Input } from '@angular/core';
//import { UploadFilesService } from 'src/app/services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'upload-files',
  templateUrl: 'upload-files.component.html'

})


export class UploadFilesComponent {
  selectedFiles;

  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }
}
