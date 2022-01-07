import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../../services/task.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskCreateComponent } from "./task-create.component";
import { TaskEditComponent } from "./task-edit.component";
import { NotificationsService } from "../../../services/notifications.service";

@Component({
  selector: 'task-handling-component',
  templateUrl: 'task-handling.component.html'
})
export class TaskHandlingComponent implements OnInit {
  courseId;
  tasks;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private taskService: TaskService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
          this.courseId = params.get('courseId');
        }
      );
    this.getTasks(this.courseId);
  }
  
  addNewTask() {
    const modal = this.modalService.open(TaskCreateComponent, { size: 'lg' });
    modal.componentInstance.courseId = this.courseId;
    modal.result.then(() => this.getTasks(this.courseId));
  }

  editTask(task) {
    const modalRef = this.modalService.open(TaskEditComponent, { size: 'lg' });
    modalRef.componentInstance.taskId = task.id;
    modalRef.result.then(() => this.getTasks(this.courseId));
  }

  deleteTask(task) {
    if (confirm("Tikrai norite ištrinti šią užduotį?")) {
      this.taskService.deleteTask(task.id).subscribe(result => {
        this.notificationsService.showSuccess("Užduotis buvo ištrinta!", "");
        this.getTasks(this.courseId);
        },
        error => this.notificationsService.showError(error.error.errorMessages.toString(), ""));
    }
  }

  getTasks(courseId) {
    return this.taskService.getByCourseId(courseId).subscribe(result => {
      this.tasks = result.content;
    },
      error => this.notificationsService.showError(error.error.errorMessages.toString(), ""));
  }

}
