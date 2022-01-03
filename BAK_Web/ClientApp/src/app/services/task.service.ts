import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from "../interfaces/service-response.interface";

@Injectable()
export class TaskService {
  private baseUrl = "https://localhost:44319/api/";

  constructor(
    private httpClient: HttpClient
  ) { }

  getByCourseId(courseId) {
    return this.httpClient.get<ServiceResponse>(this.baseUrl + 'courses/' + courseId + '/tasks');
  }

}
