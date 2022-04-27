import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";
import { CourseExecutionService } from "../../services/course-execution.service";
import { TaskExecutionService } from "../../services/task-execution.service";

@Component({
  selector: 'evaluate-component',
  templateUrl: 'evaluate.component.html'
})
export class EvaluateComponent implements OnInit {
  coursesExecution;
  courseExecutionId;
  selectedTask;
  possibleMarksArray: Array<number> = [];

  constructor(private taskExecutionService: TaskExecutionService, private courseExecutionService: CourseExecutionService, private route: ActivatedRoute, private router: Router, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  ngOnInit() {
    this.courseExecutionId = this.route.snapshot.paramMap.get('courseExecutionId');
    this.getExecutedCourse(this.courseExecutionId);
  }

  focusTaskExecution(taskExecution) {
    this.selectedTask = taskExecution;
  }

  saveEvaluation() {
    if (!confirm("Ar tikrai norite išsaugoti kurso vertinimą? Išsaugojus, vertinimo pakeisti nebebus galima."))
      return null;

    return this.courseExecutionService.evaluateCourse(this.coursesExecution).subscribe(result => {
      this.notificationsService.showSuccess("Kursas sėkmingai įvertintas!", "");
      this.getExecutedCourse(this.coursesExecution.id);

    },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

  isTaskExecutionEvaluatedAsSuccessful(taskExecution) {
    return taskExecution.mark >= taskExecution.task.minimumPointsCompletedToSuccess;
  }

  isCourseExecutionEvaluatedAsSuccessful() {
    if (!this.coursesExecution.taskExecutions || !this.coursesExecution.course)
      return null;

    var minimumTasksToCompleteToSuccess = this.coursesExecution.course.minimumTasksCompletedToSuccess;

    var tasksCompleted = this.coursesExecution.taskExecutions
      .filter(x => x.mark >= x.task.minimumPointsCompletedToSuccess).length;
     
    return minimumTasksToCompleteToSuccess <= tasksCompleted;
  }

  getExecutedCourse(executionId) {
    return this.courseExecutionService.getById(executionId).subscribe(result => {
      this.coursesExecution = result.content;

      return this.taskExecutionService.getByCourseId(executionId).subscribe(result => {
        this.coursesExecution.taskExecutions = result.content;

        this.coursesExecution.taskExecutions.forEach(obj => {
          obj.mark = 0;
        });
        this.selectedTask = result.content[0];

        for (var i = 0; i <= this.selectedTask.task.maximumPointsToGet; i++) {
          this.possibleMarksArray.push(i);
        }

      },
        error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
    },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

}
