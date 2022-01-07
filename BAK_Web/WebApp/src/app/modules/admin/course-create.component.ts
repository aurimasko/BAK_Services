import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseService } from "../../services/course.service";

@Component({
  selector: 'course-create-component',
  templateUrl: 'course-create.component.html'

})
export class CourseCreateComponent {
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) { }

  newCourse = {
    name: null,
    level: null
  };

  courseCreated;
 
  close() {
    this.activeModal.close();
  }

  create() {

    this.courseService.createCourse(this.newCourse).subscribe(result => {
        console.log(result);
        this.courseCreated = true;
      },
      error => console.log(error));
  }
}
