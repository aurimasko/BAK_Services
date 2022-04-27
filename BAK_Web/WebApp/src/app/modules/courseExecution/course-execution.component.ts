import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { CourseExecutionService } from "../../services/course-execution.service";
import { TaskService } from "../../services/task.service";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { BlocklyCode } from "../../interfaces/blockly-code.interface";

type CourseTask = {
  id: any;
  name: string;
  description: string;
  courseId: any;
  executionCode: string;
  executionWorkspace: string;
  minimumTestsCompletedToSuccess: number;
};

@Component({
  selector: 'course-execution-component',
  templateUrl: 'course-execution.component.html',
  styleUrls: ['../../app.component.css']

})

export class CourseExecutionComponent implements OnInit   {

  course = {
    name: null,
    description: null,
    id: null,
    tasks: [] as CourseTask[]
  };
  
  courseId;
  selectedTask;
  courseIsDone = false;
  isLoading = false;
  executionWorkspace = "";
  executionWorkspaceToBlockly = "";

  constructor(private route: ActivatedRoute, private router: Router, private courseExecutionService: CourseExecutionService, private courseService: CourseService, private taskService: TaskService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper) { }
  
  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.getCourse(this.courseId);
    this.getTasks(this.courseId);
  }

  submitExecution() {
    if (!confirm("Ar tikrai norite pateikti kursą vertinimui? Pateikus vertinimui, pakeitimų daryti nebegalėsite."))
      return null;

    var taskExecutions = [] as any; // add concrete class

    this.course.tasks.forEach((task, index) => {

      var execution = {
        executionCode: task.executionCode,
        taskId: task.id
      };
      taskExecutions.push(execution);
    });
  
    var courseExecution = {
      userId: 'd80bbc62-b97a-40a6-a99d-040313df3b6e',
      courseId: this.courseId,
      taskExecutions: taskExecutions,
    };

    this.courseIsDone = true;
    this.isLoading = true;

    return this.courseExecutionService.submitExecution(courseExecution).subscribe(result => {
        if (result.isSuccess) {
          this.notificationsService.showSuccess("Darbas sėkmingai atiduotas vertinimui.", "");
          console.log('asd ' + JSON.stringify(result.content));
          console.log(result.content.courseExecutionId);
          this.router.navigate(['/summary', result.content.id]);
        }
        this.isLoading = false;
      },
      error => {
        this.courseIsDone = false;
        this.isLoading = false;
        this.notificationsService.showError(this.responseHelper.showErrorMessage(error), "");
      });
  }


  updateTaskExecutionCode(blocklyCode: BlocklyCode) {
    this.selectedTask.executionCode = blocklyCode.code;
    this.selectedTask.executionWorkspace = blocklyCode.workspaceJson;
  }

  chooseTask(task) {
    this.executionWorkspaceToBlockly = task.executionWorkspace;
    this.selectedTask = task;
  }
  getCourse(courseId) {
    return this.courseService.getById(courseId).subscribe(result => {
        this.course = result.content[0];
      },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }

  getTasks(courseId) {
    return this.taskService.getByCourseId(courseId).subscribe(result => {
      this.course.tasks = result.content;
      this.selectedTask = this.course.tasks[0];
    },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }
}
