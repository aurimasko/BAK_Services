import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";

@Component({
  selector: 'course-component',
  templateUrl: 'course.component.html'
})
export class CourseComponent implements OnInit {
  course;
  courseId;
  courseTasks;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.getCourses(this.courseId);
  }

  startCourse(course) {
    this.router.navigate(['/course', course.id, 'execution']);
  }


  getCourses(courseId) {
    return this.courseService.getById(courseId).subscribe(result => {
          this.course = result.content[0];
        },
      error => this.notificationsService.showError(this.responseHelper.showErrorMessage(error), ""));
  }
}
