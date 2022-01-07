import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'courses-component',
  templateUrl: 'courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses;
  courseId;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.getCourses(this.courseId);
  }

  openCourse(course) {
    this.router.navigate(['/course', { courseId: course.id }]);
  }

  getCourses(courseId) {
    if (!courseId) {
      return this.courseService.getAll().subscribe(result => {
          this.courses = result.content;
          //this.selectedFeatureToggle = result[0];
        },
        error => console.log(error));
    } else {
      return this.courseService.getById(courseId).subscribe(result => {
          this.courses = result.content;
          //this.selectedFeatureToggle = result[0];
        },
        error => console.log(error));
    }
  }
}
