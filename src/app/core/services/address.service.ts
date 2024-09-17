import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  //Login function
  getAddress(query: any = {}) {
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
      .get<any>(
        `https://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/uk/nr11ne?format=json&lines=3`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
}
