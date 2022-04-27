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

 getCourseExecutionStatus(executionId) {
   if (!this.coursesExecutions)
     return null;

   var successful = this.coursesExecutions.some(x => x.id === executionId && x.successful === true);
   var unsuccessful = this.coursesExecutions.some(x => x.id === executionId && x.successful === false);
   var notEvaluatedYet = this.coursesExecutions.some(x => x.id === executionId && x.successful == null);

   if (unsuccessful)
     return 0;

   if (successful)
     return 1;

   if (notEvaluatedYet)
     return 2;

   return null;
  }

 openCourseExecution(executionId) {
   this.router.navigate(['/evaluation', executionId]);
 }

  getExecutedCourses() {
    return this.courseExecutionService.getAll().subscribe(result => {
        this.coursesExecutions = result.content;
      },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

}
