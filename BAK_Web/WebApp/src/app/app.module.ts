import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBlocklyModule } from 'ngx-blockly';
import 'blockly/blocks';

import { JwtInterceptor } from './modules/auth/jwt.interceptor';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/login/registration.component';
import { AuthGuard } from './modules/auth/authGuard';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { HomeComponent } from './modules/home/home.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { CourseComponent } from './modules/course/course.component';
import { CourseHandlingComponent } from './modules/admin/course/course-handling.component';
import { CourseEditComponent } from './modules/admin/course/course-edit.component';
import { CourseCreateComponent } from './modules/admin/course/course-create.component';
import { CourseExecutionComponent } from './modules/courseExecution/course-execution.component';
import { TaskHandlingComponent } from './modules/admin/task/task-handling.component';
import { TaskEditComponent } from './modules/admin/task/task-edit.component';
import { TaskCreateComponent } from './modules/admin/task/task-create.component';
import { ExecutedCoursesSummaryComponent } from './modules/executedCoursesSummary/executed-courses-summary.component';
import { ExecutedCourseSummaryComponent } from './modules/executed-course-summary/executed-course-summary.component';
import { BlocklyComponent } from './modules/blockly/blockly.component';
import { EvaluationSummaryComponent } from './modules/evaluation/evaluation-summary.component';
import { EvaluateComponent } from './modules/evaluation/evaluate.component';

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
    TaskCreateComponent,
    CourseExecutionComponent,
    ExecutedCoursesSummaryComponent,
    ExecutedCourseSummaryComponent,
    BlocklyComponent,
    EvaluationSummaryComponent,
    EvaluateComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxBlocklyModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'course/:courseId', component: CourseComponent, canActivate: [AuthGuard] },
      { path: 'admin/courses', component: CourseHandlingComponent, canActivate: [AuthGuard] },
      { path: 'admin/courses/:courseId/tasks', component: TaskHandlingComponent, canActivate: [AuthGuard] },
      { path: 'course/:courseId/execution', component: CourseExecutionComponent, canActivate: [AuthGuard] },
      { path: 'summary/:courseExecutionId', component: ExecutedCourseSummaryComponent, canActivate: [AuthGuard] },
      { path: 'evaluation', component: EvaluationSummaryComponent, canActivate: [AuthGuard] },
      { path: 'evaluation/:courseExecutionId', component: EvaluateComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ])
  ],
  providers: [
    CourseService,
    TaskService,
    NotificationsService,
    ResponseHelper,
    CourseExecutionService,
    TaskExecutionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
