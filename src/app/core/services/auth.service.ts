import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  );

  currentUser = this.loggedInUser.asObservable();

  constructor() {}

  updateUser(user: any) {
    this.loggedInUser.next(user);
  }

  //Get LocalStorage user details function
  getUserDetails() {
    //Gets the details of the current logged in user from localStorage
    // let userDetails = JSON.parse(localStorage.getItem('currentUser') || '{}');

    return this.currentUser;
  }

  //set the logged in user details to localstorage
  setUserDetails(userDetails: any) {
    localStorage.setItem('currentUser', JSON.stringify(userDetails));
    this.updateUser(userDetails);
  }

  logout() {
    localStorage.clear();
    this.loggedInUser.next({});
  }
}
