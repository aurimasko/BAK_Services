import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "../../../services/task.service";
import { NotificationsService } from "../../../services/notifications.service";

@Component({
  selector: 'task-create-component',
  templateUrl: 'task-create.component.html'

})
export class TaskCreateComponent {
  constructor(public activeModal: NgbActiveModal, private taskService: TaskService, private notificationsService: NotificationsService) { }

  courseId; 
  newTask = {
    name: null,
    description: null,
    courseId: null,
    minimumTestsCompletedToSuccess: null,
    tests: [
      {
        testCode: "Test code 1"
      },
      {
        testCode: "Test code 2"
      }
    ]
  };

  taskCreated;
 
  close() {
    this.activeModal.close();
  }

  create() {

    this.newTask.courseId = this.courseId;

    this.taskService.createTask(this.newTask).subscribe(result => {
        this.notificationsService.showSuccess("Užduotis buvo sukurta!", "");
      },
      error => this.notificationsService.showError(error.error.errorMessages.toString(), ""));
  }
}
