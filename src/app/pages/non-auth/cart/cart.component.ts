import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
  viewChild,
} from '@angular/core';
import PaymentComponent from '../payment/payment.component';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent implements OnDestroy {
  @ViewChild('paymentGateway') paymentGateway!: PaymentComponent;

  cartDetails: any;
  amountTotal: number = 0;

  private cartService = inject(CartService);

  constructor() {
    this.getCartIems();
  }

  pay() {
    this.paymentGateway.initializePayment(this.cartDetails[0]);
  }

  getCartIems() {
    this.cartService
      .getCartItemId(JSON.parse(localStorage.getItem('currentUser') || '{}').id)
      .subscribe((res) => {
        this.cartDetails = res.data;
      });
  }

  getTotal() {
    this.amountTotal = 0;
    this.cartDetails?.forEach((res: any) => {
      this.amountTotal = this.amountTotal + res.car.price;
      console.log(this.amountTotal);
    });

    return this.amountTotal;
  }

  getTax() {
    return parseInt(((this.amountTotal * 5) / 100).toString());
  }

  getGrandTotal() {
    return this.amountTotal ? this.amountTotal + this.getTax() + 1500 : 0;
  }

  removeFromCart(id: any) {
    this.cartService.removeFromCartByid(id).subscribe((res) => {
      window.location.reload();
    });
  }

  getHandling() {
    return this.amountTotal ? 1500 : 0;
  }

  ngOnDestroy(): void {
    this.amountTotal = 0;
  }
}
