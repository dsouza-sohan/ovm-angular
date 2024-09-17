import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  loginModalVisible = new BehaviorSubject<boolean>(false);

  isLoginModalVisible = this.loginModalVisible.asObservable();

  constructor() { }

  updateQuote(visible: boolean) {
    console.log("here", visible)
    this.loginModalVisible.next(visible);
  }
}
