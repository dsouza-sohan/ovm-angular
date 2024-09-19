import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BiddingService {
  constructor(private http: HttpClient) {}

  addBid(carID: any, userID: any, payload: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(
      `${environment.apiUrl}bidding/${carID}/${userID}`,
      payload,
      {
        headers: headers,
      }
    );
  }
}
