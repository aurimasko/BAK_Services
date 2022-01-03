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

import { CourseService } from './services/course.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'courses', component: CoursesComponent },
      { path: 'course', component: CourseComponent }
    ])
  ],
  providers: [
    CourseService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
