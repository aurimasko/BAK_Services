import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications.service";
import { ResponseHelper } from "../../helpers/response-helpers";

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  courses;
  courseId;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private notificationsService: NotificationsService, private responseHelper: ResponseHelper) { }

  ngOnInit() {
  }
  
}
