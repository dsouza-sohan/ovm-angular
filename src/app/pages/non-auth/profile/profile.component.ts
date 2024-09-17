import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../../core/services/address.service';
import { CommonModule } from '@angular/common';
import { ButtonDirective, TableModule, UtilitiesModule } from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    UtilitiesModule,
    ButtonDirective,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private addressService = inject(AddressService);
  private carService = inject(CarService);
  userDetails: any;
  addressList: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.getUserDetails();
    this.getAddress();
  }

  ngOnInit(): void {}

  getUserDetails() {
    this.userService
      .getUserDetailsById(
        JSON.parse(localStorage.getItem('currentUser') || '{}').id
      )
      .subscribe((res) => {
        this.userDetails = res.data;
        this.setUserDetails();
      });
  }

  getProfileImage() {
    let defaultImage =
      'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

    // if (this.userDetails?.profImage) {
    //   return this.userDetails?.profImage;
    // }

    return defaultImage;
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
  });

  isFormSubmitted: boolean = false;

  get f() {
    return this.loginForm.controls;
  }

  setUserDetails() {
    this.loginForm.patchValue({
      email: this.userDetails.email,
      firstname: this.userDetails.firstname,
      lastname: this.userDetails.lastname,
      phone: this.userDetails.phone,
      address: this.userDetails.address.summaryline,
    });
  }

  getAddress() {
    this.addressService.getAddress().subscribe((res) => {
      this.addressList = res;
      console.log(this.addressList);
    });
  }

  updateDetails() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    } else {
      const payload = {
        email: this.f.email.value,
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        phone: this.f.phone.value,
        address: this.getAddressValue(this.f.address.value),
      };
      this.userService
        .updateUser(
          payload,
          JSON.parse(localStorage.getItem('currentUser') || '{}').id
        )
        .subscribe((res) => {
          // this.
        });
    }
  }

  getAddressValue(value: string | null) {
    return this.addressList.find((res) => {
      value === res.summaryline;
      return res;
    });
  }

  editCar(car: any) {
    this.router.navigate(['/edit-car', car._id]);
  }

  deleteCar(car: any) {
    this.carService.deleteCar(car._id).subscribe((res) => {
      window.location.reload();
    });
  }

  uploadCarImage(car: any) {}
}
