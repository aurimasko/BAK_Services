import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from "../interfaces/service-response.interface";

@Injectable()
export class CourseExecutionService {
  private serviceUrl = "./api/";
  private baseUrl = this.serviceUrl + "courseexecutions";

  constructor(
    private httpClient: HttpClient
  ) { }

  submitExecution(courseExecution) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl, courseExecution, { headers: { "Content-Type": "application/json" } });
  }

  getAll() {
    return this.httpClient.get<ServiceResponse>(this.baseUrl);
  }

  getByUserId(userId) {
    return this.httpClient.get<ServiceResponse>(this.serviceUrl + 'users/' + userId + '/courseexecutions');
  }
  /*
  getAll() {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + '/get', null, { headers: { "Content-Type": "application/json" } });
  }

  getById(courseId) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + '/get', JSON.stringify([courseId]), { headers: { "Content-Type": "application/json" } });
  }

  deleteCourse(courseId) {
    return this.httpClient.delete<ServiceResponse>(this.baseUrl + '/' + courseId);
  }
  createCourse(course) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl, course, { headers: { "Content-Type": "application/json" } });
  }
  updateCourse(course) {
    return this.httpClient.put<ServiceResponse>(this.baseUrl, course);
  }
  */
}
