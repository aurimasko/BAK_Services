import { Component, OnInit } from '@angular/core';
import { TaskExecutionService } from "../../services/task-execution.service";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";

import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'executed-course-summary-component',
  templateUrl: 'executed-course-summary.component.html',
  styleUrls: ['../../app.component.css']

})
export class ExecutedCourseSummaryComponent implements OnInit {
  tasksExecution;
  courseExecutionId;
  selectedTask;

  constructor(private route: ActivatedRoute, private router: Router, private taskExecutionService: TaskExecutionService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper) { }

  ngOnInit() {
    this.courseExecutionId = this.route.snapshot.paramMap.get('courseExecutionId');

    this.getTasksExecution(this.courseExecutionId);
  }

  getTasksExecution(courseExecutionId) {
    return this.taskExecutionService.getByCourseId(courseExecutionId).subscribe(result => {
      this.tasksExecution = result.content;
      this.selectedTask = result.content[0];
    },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

  getMarkForTask(taskExecution) {
    var completedTests = taskExecution.taskExecutionsTests.filter(element => {
      return element.completed;
    })
    return completedTests.length;
  }

  focusTaskExecution(taskExecution) {
    this.selectedTask = taskExecution;
  }
  /*
  openCourse(courseExecution) {
    this.router.navigate(['/summary', courseExecution.id]);
  }*/
  
}
