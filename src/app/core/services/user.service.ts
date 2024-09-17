import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //Login function
  getUserDetailsById(id: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http
      .get<any>(`${environment.apiUrl}user/${id}`, {
        headers: headers,
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  //Login function
  updateUser(formData: any, id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http
      .patch<any>(`${environment.apiUrl}user/${id}`, formData, {
        headers: headers,
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
}
