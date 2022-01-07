import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { HomeComponent } from './modules/home/home.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { CourseComponent } from './modules/course/course.component';
import { CourseHandlingComponent } from './modules/admin/course-handling.component';
import { CourseEditComponent } from './modules/admin/course-edit.component';
import { CourseCreateComponent } from './modules/admin/course-create.component';

import { UploadFilesComponent } from './modules/common/upload-files.component';

import { TaskHandlingComponent } from './modules/admin/task-handling.component';
import { TaskEditComponent } from './modules/admin/task-edit.component';
import { TaskCreateComponent } from './modules/admin/task-create.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CourseService } from './services/course.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
    CourseHandlingComponent,
    CourseEditComponent,
    CourseCreateComponent,
    TaskHandlingComponent,
    TaskEditComponent,
    UploadFilesComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'courses', component: CoursesComponent },
      { path: 'course', component: CourseComponent },
      { path: 'admin/courses', component: CourseHandlingComponent },
      { path: 'admin/courses/:courseId/tasks', component: TaskHandlingComponent }
    ])
  ],
  providers: [
    CourseService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
