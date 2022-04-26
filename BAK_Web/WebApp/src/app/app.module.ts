import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxBlocklyModule } from 'ngx-blockly';
import 'blockly/blocks';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { HomeComponent } from './modules/home/home.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { CourseComponent } from './modules/course/course.component';
import { CourseHandlingComponent } from './modules/admin/course/course-handling.component';
import { CourseEditComponent } from './modules/admin/course/course-edit.component';
import { CourseCreateComponent } from './modules/admin/course/course-create.component';
import { CourseExecutionComponent } from './modules/courseExecution/course-execution.component';
import { UploadFilesComponent } from './modules/common/upload-files.component';
import { TaskHandlingComponent } from './modules/admin/task/task-handling.component';
import { TaskEditComponent } from './modules/admin/task/task-edit.component';
import { TaskCreateComponent } from './modules/admin/task/task-create.component';
import { ExecutedCoursesSummaryComponent } from './modules/executedCoursesSummary/executed-courses-summary.component';
import { ExecutedCourseSummaryComponent } from './modules/executed-course-summary/executed-course-summary.component';
import { BlocklyComponent } from './modules/blockly/blockly.component';
import { EvaluationSummaryComponent } from './modules/evaluation/evaluation-summary.component';

import { CourseService } from './services/course.service';
import { TaskService } from './services/task.service';
import { NotificationsService } from './services/notifications.service';
import { ResponseHelper } from "./helpers/response-helpers";
import { CourseExecutionService } from "./services/course-execution.service";
import { TaskExecutionService } from "./services/task-execution.service";


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
    TaskCreateComponent,
    CourseExecutionComponent,
    ExecutedCoursesSummaryComponent,
    ExecutedCourseSummaryComponent,
    BlocklyComponent,
    EvaluationSummaryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgxBlocklyModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'courses', component: CoursesComponent },
      { path: 'course/:courseId', component: CourseComponent },
      { path: 'admin/courses', component: CourseHandlingComponent },
      { path: 'admin/courses/:courseId/tasks', component: TaskHandlingComponent },
      { path: 'course/:courseId/execution', component: CourseExecutionComponent },
      { path: 'summary', component: ExecutedCoursesSummaryComponent },
      { path: 'summary/:courseExecutionId', component: ExecutedCourseSummaryComponent },
      { path: 'evaluation', component: EvaluationSummaryComponent }

    ])
  ],
  providers: [
    CourseService,
    TaskService,
    NotificationsService,
    ResponseHelper,
    CourseExecutionService,
    TaskExecutionService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
