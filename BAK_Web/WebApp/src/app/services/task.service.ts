import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from "../interfaces/service-response.interface";

@Injectable()
export class TaskService {
  private baseUrl = "./api/";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getByCourseId(courseId) {
    return this.httpClient.get<ServiceResponse>(this.baseUrl + 'courses/' + courseId + '/tasks');
  }

  getById(taskId) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + 'tasks/get', JSON.stringify([taskId]), { headers: { "Content-Type": "application/json" } });
  }

  createTask(task) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + 'tasks/',
      task,
      { headers: { "Content-Type": "application/json" } });
  }

  updateTask(task) {
    return this.httpClient.put<ServiceResponse>(this.baseUrl + 'tasks/', task);

  }

  deleteTask(taskId) {
    return this.httpClient.delete<ServiceResponse>(this.baseUrl + 'tasks/' + taskId);
  }
}
