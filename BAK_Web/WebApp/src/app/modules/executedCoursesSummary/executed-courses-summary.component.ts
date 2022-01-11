import { Component, OnInit } from '@angular/core';
import { CourseExecutionService } from "../../services/course-execution.service";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";

import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'executed-courses-summary-component',
  templateUrl: 'executed-courses-summary.component.html',
  styleUrls: ['../../app.component.css']

})
export class ExecutedCoursesSummaryComponent implements OnInit {
  coursesExecution;

  constructor(private route: ActivatedRoute, private router: Router, private courseExecutionService: CourseExecutionService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper) { }

  ngOnInit() {
    this.getCourseExecutions();
  }

  openCourse(courseExecution) {
    this.router.navigate(['/summary', courseExecution.id]);

  }

  getCourseExecutions() {
    var userId = 'd80bbc62-b97a-40a6-a99d-040313df3b6e';

    return this.courseExecutionService.getByUserId(userId).subscribe(result => {
      this.coursesExecution = result.content;
    },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }
}
