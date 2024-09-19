import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import {
  ButtonDirective,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalFooterComponent,
  FormFloatingDirective,
  FormControlDirective,
} from '@coreui/angular';
import { LoginService } from '../../../core/services/login.service';
import { BidModalService } from '../../../core/services/bid-modal.service';
import { BiddingService } from '../../../core/services/bidding.service';

@Component({
  selector: 'app-bid-modal-comp',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormControlDirective,
    FormFloatingDirective,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './bid-modal-comp.component.html',
  styleUrl: './bid-modal-comp.component.scss',
})
export class BidModalCompComponent {
  public visible = false;
  private route = inject(ActivatedRoute);
  private biddingService = inject(BiddingService);

  carDetails = JSON.parse(localStorage.getItem('carDetails') || '{}');

  constructor(
    private _modalService: BidModalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    console.log('visible', this.visible, this.carDetails);
    this._modalService.isBidModalVisible.subscribe((res) => {
      this.visible = res;
      console.log(this.visible);
    });
  }

  toggleLiveDemo() {
    console.log('ere');
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  loginForm = this.fb.group({
    price: ['', [Validators.required]],
  });

  isFormSubmitted: boolean = false;

  get f() {
    return this.loginForm.controls;
  }

  private loginService = inject(LoginService);

  login() {
    this.isFormSubmitted = true;
    console.log(this.f.price.value, this.loginForm.invalid);
    if (this.loginForm.invalid) {
      return;
    } else {
      let formdata = {
        bidAmount: this.f.price.value,
      };
      console.log(this.carDetails._id, 'cardetails');
      this.biddingService
        .addBid(
          this.carDetails._id,
          JSON.parse(localStorage.getItem('currentUser') || '{}').id,
          formdata
        )
        .subscribe((res) => {
          if (res.data) {
            this._modalService.updateBidModal(false);
            this.router.navigate(['/profile']);
          }
        });
    }
  }
}
