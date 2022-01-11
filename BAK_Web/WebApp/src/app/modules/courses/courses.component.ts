import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";

@Component({
  selector: 'courses-component',
  templateUrl: 'courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses;
  courseId;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.getCourses(this.courseId);
  }

  openCourse(course) {
    this.router.navigate(['/course', course.id]);
  }

  getCourses(courseId) {
    if (!courseId) {
      return this.courseService.getAll().subscribe(result => {
          this.courses = result.content;
        },
        error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
    } else {
      return this.courseService.getById(courseId).subscribe(result => {
          this.courses = result.content;
        },
        error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
    }
  }

  getCourseLevelText(courseLevel) {
    switch (courseLevel) {
    case 'Easy':
      return "Pradendatiesiems";
    case 'Medium':
      return 'Susipažinusiems';
    case 'Hard':
      return 'Pažengusiems';
    }
    return null;
  }
}
