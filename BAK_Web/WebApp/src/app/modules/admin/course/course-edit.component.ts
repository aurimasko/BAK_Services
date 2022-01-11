import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseService } from "../../../services/course.service";
import { NotificationsService } from "../../../services/notifications.service";
import { ResponseHelper } from "../../../helpers/response-helpers";

@Component({
  selector: 'course-edit-component',
  templateUrl: 'course-edit.component.html'

})
export class CourseEditComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  courseId: any;
  editableCourse = {
    name: null,
    description: null,
    level: null,
    minimumTasksCompletedToSuccess: null
  };

  ngOnInit() {
    this.getCourse(this.courseId);
  }
  close() {
    this.activeModal.close();
  }

  getCourse(courseId) {
    this.courseService.getById(courseId).subscribe(result => {
        this.editableCourse = result.content[0];
      },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

  update() {
    this.courseService.updateCourse(this.editableCourse).subscribe(result => {
        this.editableCourse = result.content;
      this.notificationsService.showSuccess("Kursas buvo atnaujintas!", "");
    },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }
  
}
