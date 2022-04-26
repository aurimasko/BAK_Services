import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";
import { CourseExecutionService } from "../../services/course-execution.service";

@Component({
  selector: 'evaluation-summary-component',
  templateUrl: 'evaluation-summary.component.html'
})
export class EvaluationSummaryComponent implements OnInit {
  coursesExecutions;

  constructor(private courseExecutionService: CourseExecutionService, private route: ActivatedRoute, private router: Router, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  ngOnInit() {
    this.getExecutedCourses();
  }

 /* openCourse(course) {
    console.log('asd ' + JSON.stringify(course) + ', ' + course.id);

    var courseExecution = this.getCourseExecution(course.id);

    if (courseExecution != null)
      this.router.navigate(['/summary', courseExecution.id]); 
    else
      this.router.navigate(['/course', course.id]);
  }

  getCourseExecution(courseId) {
    return this.coursesExecutions.find(x => x.courseId === courseId);
  }*/

 getCourseExecutionStatus(executionId) {
    if (!this.coursesExecutions)
      return null;

   var successful = this.coursesExecutions.some(x => x.id === executionId && x.successful);
   var unsuccessful = this.coursesExecutions.some(x => x.id === executionId && !x.successful);
   var notExists = !this.coursesExecutions.some(x => x.id === executionId);

    if (notExists)
      return 2;

    if (unsuccessful)
      return 0;

    if (successful)
      return 1;

    return null;
  }

  getExecutedCourses() {
    return this.courseExecutionService.getAll().subscribe(result => {
        this.coursesExecutions = result.content;
      },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

 /* getCourses(courseId) {
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
  }*/
}
