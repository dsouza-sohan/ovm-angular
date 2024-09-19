import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export default class OrdersComponent {
  orders: any;
  private orderService = inject(OrdersService);

  constructor() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService
      .getOrderId(JSON.parse(localStorage.getItem('currentUser') || '{}').id)
      .subscribe((res: { data: any }) => {
        this.orders = res.data;
      });
  }
}
