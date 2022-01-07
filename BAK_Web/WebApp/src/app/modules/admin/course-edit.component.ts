import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseService } from "../../services/course.service";

@Component({
  selector: 'course-edit-component',
  templateUrl: 'course-edit.component.html'

})
export class CourseEditComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) { }

  course: any;
  editableCourse;
   courseEdited = false;

  ngOnInit() {
    this.editableCourse = this.course;
  }
  close() {
    this.activeModal.close();
  }

  update() {
    this.courseService.updateCourse(this.editableCourse).subscribe(result => {
        console.log(result);
        this.courseEdited = true;
      this.course = result.content;
      this.editableCourse = result.content;
    },
      error => console.log(error));
  }
  
}
