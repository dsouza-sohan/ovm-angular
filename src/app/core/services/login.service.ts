import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private authService = inject(AuthService);

  //Login function
  login(formData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http
      .post<any>(`${environment.apiUrl}login`, formData, {
        headers: headers,
      })
      .pipe(
        map((result: any) => {
          localStorage.setItem('currentUser', JSON.stringify(result.data));
          this.authService.setUserDetails(result.data);
          return result;
        })
      );
  }
}
