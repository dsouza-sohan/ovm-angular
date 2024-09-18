import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
      key: 'sk_test_51PyBiv03YUs9ds2ynNrIwFc09oKNjmm7sbJgzkUHAvP9SG0qyH8q0B9mwsf7S6aMTbaqzBqzWs4xTfvuDLa3yFP000iawEuE12',
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
    this.http
      .post('path_to_backend', {
        description: product.description,
        amount: product.amount * 100,
        currency: product.currency,
        stripeToken: stripeToken.id,
      })
      .subscribe(
        (data) => {
          this.paymentMessageShown = true;
          this.paymentMessageSuccess = true;
          this.paymentMessageText = 'Payment was successfull';
          setTimeout(() => {
            this.paymentMessageShown = false;
          }, 4000);
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
