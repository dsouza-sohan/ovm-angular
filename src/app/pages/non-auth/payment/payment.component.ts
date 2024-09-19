import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export default class PaymentComponent implements OnInit {
  private paymentHandler: any;
  public paymentMessageShown: boolean = false;
  public paymentMessageSuccess: boolean = false;
  public paymentMessageText: any;

  private orderService = inject(OrdersService);
  private cartService = inject(CartService);
  public productList: any[] = [
    {
      name: 'Small plan',
      amount: 25,
      description: 'Small plan description description',
      currency: 'USD',
    },
    {
      name: 'Premium plan',
      amount: 40,
      description: 'Premium plan description',
      currency: 'USD',
    },
    {
      name: 'Platinum plan',
      amount: 100,
      description: 'Premium plan description',
      currency: 'USD',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.invokeStripe();
  }

  public initializePayment(product: any) {
    const paymentHandler = (window as any).StripeCheckout.configure({
      key: 'pk_test_51PyBiv03YUs9ds2ysxuFGBWTlTrSDx75iwPfkmECWuolHmwJ8vSmMVDU5AsJksMiHcS3BKgvK0JjF5H2oWO3jnBU00eHGFkp2p',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.processPayment(product, stripeToken);
      },
    });

    paymentHandler.open({
      name: product.name,
      description: 'Charge with stripe api',
      amount: product.amount * 100,
    });
  }

  private processPayment(product: any, stripeToken: any) {
    console.log(stripeToken);
    this.orderService
      .paymentDone(
        product.car._id,
        JSON.parse(localStorage.getItem('currentUser') || '{}').id,
        {
          paymentDetails: {
            description: product.vehicleDescription,
            price: product.amount,
            method: 'Card',
            paymentId: stripeToken.id,
          },
        }
      )
      .subscribe(
        (data) => {
          this.paymentMessageShown = true;
          this.paymentMessageSuccess = true;
          this.paymentMessageText = 'Payment was successfull';
          setTimeout(() => {
            this.paymentMessageShown = false;
            this.cartService
              .removeFromCartByid(product._id)
              .subscribe((res) => {
                window.location.reload();
              });
          }, 1000);
        },
        (error) => {
          this.paymentMessageShown = true;
          this.paymentMessageSuccess = false;
          this.paymentMessageText = error.error.message;
          setTimeout(() => {
            this.paymentMessageShown = false;
          }, 4000);
        }
      );
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any)?.StripeCheckout?.configure({
          key: 'sk_test_51PyBiv03YUs9ds2ynNrIwFc09oKNjmm7sbJgzkUHAvP9SG0qyH8q0B9mwsf7S6aMTbaqzBqzWs4xTfvuDLa3yFP000iawEuE12',
          locale: 'auto',
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
