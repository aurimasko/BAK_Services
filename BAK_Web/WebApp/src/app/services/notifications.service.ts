import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title, {
      enableHtml: true
    });
  }

  showError(message, title) {
    this.toastr.error(message, title, {
      enableHtml: true
    });
  }

  showInfo(message, title) {
    this.toastr.info(message, title, {
      enableHtml: true
    });
  }

  showWarning(message, title) {
    this.toastr.warning(message, title, {
      enableHtml: true
    });
  }

}
