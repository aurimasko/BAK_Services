import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'task-create-component',
  templateUrl: 'task-create.component.html'

})
export class TaskCreateComponent {
  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) { }

  courseId; 
  newTask = {
    name: null,
    description: null,
    courseId: null,
    tests: []
  };

  taskCreated;
 
  close() {
    this.activeModal.close();
  }

  selectFiles(event) {
    this.newTask.tests = event.target.files;
  }

  create() {

    this.newTask.courseId = this.courseId;

    this.taskService.createTask(this.newTask).subscribe(result => {
        console.log(result);
      this.taskCreated = true;
      },
      error => console.log(error));
  }
}
