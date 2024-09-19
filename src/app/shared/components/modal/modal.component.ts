import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  FormFloatingDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
} from '@coreui/angular';
import { ModalService } from '../../../core/services/modal.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'ovm-modal',
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
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class Modal1Component {
  public visible = false;
  view = 'login';

  constructor(
    private _modalService: ModalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    console.log('visible', this.visible);
    this._modalService.isLoginModalVisible.subscribe((res) => {
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

  changeView(changedView: string) {
    this.view = changedView;
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  regForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    address: [''],
  });

  isFormSubmitted: boolean = false;
  isRegFormSubmitted: boolean = false;

  get f() {
    return this.loginForm.controls;
  }

  get r() {
    return this.regForm.controls;
  }

  private loginService = inject(LoginService);

  login() {
    this.isFormSubmitted = true;
    console.log(this.f.email.value, this.loginForm.invalid);
    if (this.loginForm.invalid) {
      return;
    } else {
      let formdata = {
        email: this.f.email.value,
        password: this.f.password.value,
        role: 'User',
      };
      this.loginService.login(formdata).subscribe((res) => {
        if (res.data) {
          this._modalService.updateQuote(false);
          this.router.navigate(['/']);
        }
      });
    }
  }

  register() {
    this.isRegFormSubmitted = true;
    if (this.regForm.invalid) {
      return;
    } else {
      let formdata = {
        email: this.r.email.value,
        password: this.r.password.value,
        firstname: this.r.password.value,
        lastname: this.r.password.value,
        phone: this.r.password.value,
        address: this.r.address.value,
        role: 'User',
      };
      this.loginService.register(formdata).subscribe((res) => {
        if (res.data) {
          this._modalService.updateQuote(false);
          this.router.navigate(['/']);
        }
      });
    }
  }
}
