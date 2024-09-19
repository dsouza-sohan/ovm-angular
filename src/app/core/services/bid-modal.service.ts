import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BidModalService {
  bidModalVisible = new BehaviorSubject<boolean>(false);

  isBidModalVisible = this.bidModalVisible.asObservable();

  constructor() {}

  updateBidModal(visible: boolean) {
    console.log('here', visible);
    this.bidModalVisible.next(visible);
  }
}
