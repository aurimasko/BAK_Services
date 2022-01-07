import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseService } from "../../services/course.service";
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'task-edit-component',
  templateUrl: 'task-edit.component.html'

})
export class TaskEditComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService, private taskService: TaskService) { }

  courses;
  task: any;
  editableTask;
  taskEdited = false;

  ngOnInit() {
    this.editableTask = this.task;
    this.getCourses();
  }
  close() {
    this.activeModal.close();
  }

  update() {
    this.taskService.updateTask(this.editableTask).subscribe(result => {
      this.taskEdited = true;
      this.task = result.content;
      this.editableTask = result.content;
    },
      error => console.log(error));
  }
 
  getCourses() {
    return this.courseService.getAll().subscribe(result => {
        this.courses = result.content;
      },
      error => console.log(error));
  }
  
}
