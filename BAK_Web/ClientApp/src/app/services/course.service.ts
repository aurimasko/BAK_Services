import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from "../interfaces/service-response.interface";

@Injectable()
export class CourseService {
  private baseUrl = "https://localhost:44319/api/course";

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + '/get', null, { headers: { "Content-Type": "application/json" } });
  }

  getById(courseId) {
    return this.httpClient.post<ServiceResponse>(this.baseUrl + '/get', [courseId]);
  }

}
