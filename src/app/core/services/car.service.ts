import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  //Login function
  getCarBrand() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http
      .get<any>(`${environment.apiUrl}cars/brand/model`, {
        headers: headers,
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  //Login function
  getCarById(id: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http
      .get<any>(`${environment.apiUrl}cars/${id}`, {
        headers: headers,
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  //Login function
  getCars(query: any = {}) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    console.log('query', query);
    // Convert the query object to HttpParams
    let params = new HttpParams();
    for (const key in query) {
      if (query.hasOwnProperty(key) && query[key] !== undefined) {
        params = params.append(key, query[key]);
      }
    }
    console.log('query', query);
    return this.http
      .get<any>(`${environment.apiUrl}cars`, {
        headers: headers,
        params: params,
      })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  postCar(formData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}cars`, formData, {
      headers: headers,
    });
  }

  updateCar(formData: any, carid: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(
      `${environment.apiUrl}cars/${carid}`,
      formData,
      {
        headers: headers,
      }
    );
  }
}
