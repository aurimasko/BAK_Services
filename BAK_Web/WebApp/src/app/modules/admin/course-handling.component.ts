import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseEditComponent } from "./course-edit.component";
import { CourseCreateComponent } from "./course-create.component";

@Component({
  selector: 'course-handling-component',
  templateUrl: 'course-handling.component.html'
})
export class CourseHandlingComponent implements OnInit {
  courses;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  addNewCourse() {
    const modal = this.modalService.open(CourseCreateComponent, { size: 'lg' });
    modal.result.then(() => this.getCourses());
  }

  deleteCourse(course) {
    if (confirm("Tikrai norite ištrinti šį kursą?")) {
      this.courseService.deleteCourse(course.id).subscribe(result => {
          console.log(result);
          this.getCourses();
        },
        error => console.log(error));
    }
  }

  openTasksForCourse(course) {
    this.router.navigateByUrl('admin/courses/' + course.id + '/tasks');
  }

  getCourses() {
    return this.courseService.getAll().subscribe(result => {
        this.courses = result.content;
      },
      error => console.log(error));
  }
  
  editCourse(course) {
    const modalRef = this.modalService.open(CourseEditComponent, { size: 'lg' });
    modalRef.componentInstance.course = course;
    modalRef.result.then(() => this.getCourses());

  }
}
