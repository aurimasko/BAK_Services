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
  evaluateCourse(courseExecution) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + '/evaluate', courseExecution, { headers: { "Content-Type": "application/json" } });

  }
  getAll() {
    return this.httpClient.get<ServiceResponse>(this.baseUrl);
  }
  getById(executionId) {
    return this.httpClient.get<ServiceResponse>(this.baseUrl +'/'+ executionId);
  }

  getByUserId(userId) {
    return this.httpClient.get<ServiceResponse>(this.serviceUrl + 'users/' + userId + '/courseexecutions');
  }

}
