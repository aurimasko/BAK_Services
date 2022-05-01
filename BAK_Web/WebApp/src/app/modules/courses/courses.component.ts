import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";
import { CourseExecutionService } from "../../services/course-execution.service";
import { AuthenticationService } from "../../services/auth.service";

@Component({
  selector: 'courses-component',
  templateUrl: 'courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses;
  courseId;
  coursesExecutions;

  constructor(private authenticationService: AuthenticationService,private courseExecutionService: CourseExecutionService, private route: ActivatedRoute, private router: Router, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.getCourses(this.courseId);
    this.getExecutedCourses();
  }

  openCourse(course) {
    var courseExecution = this.getCourseExecution(course.id);

    if (courseExecution != null)
      this.router.navigate(['/summary', courseExecution.id]); 
    else
      this.router.navigate(['/course', course.id]);
  }

  getCourseExecution(courseId) {
    return this.coursesExecutions.find(x => x.courseId === courseId);
  }
  getCourseExecutionStatus(courseId) {
    if (!this.coursesExecutions)
      return null;

    var successful = this.coursesExecutions.some(x => x.courseId === courseId && x.successful === true);
    var unsuccessful = this.coursesExecutions.some(x => x.courseId === courseId && x.successful === false);
    var notEvaluatedYet = this.coursesExecutions.some(x => x.courseId === courseId && x.successful === null);

    var notExists = !this.coursesExecutions.some(x => x.courseId === courseId);

    if (notExists)
      return 2;

    if (unsuccessful)
      return 0;

    if (successful)
      return 1;

    if (notEvaluatedYet)
      return 3;

    return null;
  }

  getExecutedCourses() {
    var currentUser = this.authenticationService.currentUserValue;

    if (!currentUser)
      return null;

    return this.courseExecutionService.getByUserId(currentUser.id).subscribe(result => {
        this.coursesExecutions = result.content;
      },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
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
