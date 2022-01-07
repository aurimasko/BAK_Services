import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from "../interfaces/service-response.interface";

@Injectable()
export class TaskService {
  private baseUrl = "https://localhost:44319/api/";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getByCourseId(courseId) {
    return this.httpClient.get<ServiceResponse>(this.baseUrl + 'courses/' + courseId + '/tasks');
  }

  createTask(task) {
    const formData: FormData = new FormData();

    for (var i = 0; i < task.tests.length; i++) {
      formData.append("file[]", task.tests[i]);
    }

    /*formData.append('courseId', task.courseId);
    formData.append('description', task.description);
    formData.append('name', task.name);

    const req = new HttpRequest('POST',
      `${this.baseUrl}tasks/`,
      formData
    );

    return this.httpClient.request(req);*/
    
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
