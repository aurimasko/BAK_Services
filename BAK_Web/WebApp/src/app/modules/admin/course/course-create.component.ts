import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseService } from "../../../services/course.service";
import { NotificationsService } from "../../../services/notifications.service";
import { ResponseHelper } from "../../../helpers/response-helpers";

@Component({
  selector: 'course-create-component',
  templateUrl: 'course-create.component.html'

})
export class CourseCreateComponent {
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  newCourse = {
    name: null,
    level: null
  };

 
  close() {
    this.activeModal.close();
  }

  create() {

    this.courseService.createCourse(this.newCourse).subscribe(result => {
        console.log(result);
      this.notificationsService.showSuccess("Kursas buvo sukurtas!", "");

      },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }
}
