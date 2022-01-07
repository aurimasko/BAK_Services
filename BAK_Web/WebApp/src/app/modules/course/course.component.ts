import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { TaskService } from "../../services/task.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'course-component',
  templateUrl: 'course.component.html'
})
export class CourseComponent implements OnInit {
  course;
  courseId;
  courseTasks;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private taskService: TaskService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.getCourses(this.courseId);
    this.getTasks(this.courseId);
  }

  getTasks(courseId) {
    return this.taskService.getByCourseId(courseId).subscribe(result => {
        this.courseTasks = result.content;
      },
      error => console.log(error));
  }
  getCourses(courseId) {
    return this.courseService.getById(courseId).subscribe(result => {
          this.course = result.content[0];
        },
        error => console.log(error));
  }
}
