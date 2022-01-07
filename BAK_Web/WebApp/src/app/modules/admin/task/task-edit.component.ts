import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseService } from "../../../services/course.service";
import { TaskService } from "../../../services/task.service";
import { NotificationsService } from "../../../services/notifications.service";

@Component({
  selector: 'task-edit-component',
  templateUrl: 'task-edit.component.html'

})
export class TaskEditComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService, private taskService: TaskService, private notificationsService: NotificationsService) { }

  taskId;
  courses;
  editableTask;

  ngOnInit() {
    this.getTask(this.taskId);
    this.getCourses();
  }
  close() {
    this.activeModal.close();
  }

  update() {
    this.taskService.updateTask(this.editableTask).subscribe(result => {
        this.notificationsService.showSuccess("Užduotis buvo atnaujinta!", "");
      this.editableTask = result.content;
    },
      error => this.notificationsService.showError(error.error.errorMessages.toString(), ""));
  }

  getTask(taskId) {
    this.taskService.getById(taskId).subscribe(result => {
      this.editableTask = result.content[0];
      },
      error => this.notificationsService.showError(error.error.errorMessages.toString(), ""));
  }
 
  getCourses() {
    return this.courseService.getAll().subscribe(result => {
        this.courses = result.content;
      },
      error => this.notificationsService.showError(error.error.errorMessages.toString(), ""));
  }
  
}
