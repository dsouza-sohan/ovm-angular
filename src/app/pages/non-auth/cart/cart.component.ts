import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import PaymentComponent from '../payment/payment.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent {
  @ViewChild('paymentGateway') paymentGateway!: PaymentComponent;

  pay() {
    this.paymentGateway.initializePayment(1);
  }
}
