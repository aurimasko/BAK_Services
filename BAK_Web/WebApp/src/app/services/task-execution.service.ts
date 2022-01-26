import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from "../interfaces/service-response.interface";

@Injectable()
export class TaskExecutionService {
  private serviceUrl = "./api/";
  private baseUrl = this.serviceUrl + "taskexecutions";

  constructor(
    private httpClient: HttpClient
  ) { }

 
  getByCourseId(courseId) {
    return this.httpClient.get<ServiceResponse>(this.serviceUrl + 'courseexecutions/' + courseId + '/taskexecutions');
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
