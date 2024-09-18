import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonDirective,
  FormModule,
  FormSelectDirective,
  GridModule,
} from '@coreui/angular';
import { CarService } from '../../../core/services/car.service';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../../core/services/address.service';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [
    FormSelectDirective,
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonDirective,
    GridModule,
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss',
})
export default class PostCarComponent {
  private carService = inject(CarService);
  private addressService = inject(AddressService);
  cars: any[] = [];
  models: any[] = [];
  displayModels: any[] = [];
  addressList: any[] = [];

  constructor(private fb: FormBuilder) {
    this.getCarDetails();
    this.getAddress();
  }

  carForm = this.fb.group({
    brand: [null, Validators.required],
    model: [null, Validators.required],
    year: [null, Validators.required],
    mileage: [null, Validators.required],
    fuelEconomy: [null, Validators.required],
    ulez: [null, Validators.required],
    vehicleDescription: [null, Validators.required],
    vehicleFeatures: [null, Validators.required],
    vehicleStats: [null, Validators.required],
    address: [null, Validators.required],
    price: [null, Validators.required],
    isBiddable: [null, Validators.required],
    marketType: [null, Validators.required],

    driveTrain: [null, Validators.required],
    milesDriven: [null, Validators.required],
    fuelType: [null, Validators.required],
    seats: [null, Validators.required],
    doors: [null, Validators.required],
    carType: [null, Validators.required],
    transmission: [null, Validators.required],
    color: [null, Validators.required],
    registrationNumber: [null, Validators.required],
    owners: [null, Validators.required],

    battery: [null],
    dimensions: [null],
    engineAndDriveTrain: [null],
    general: [null],
    performance: [null],

    audioAndCommunicatons: [null],
    exterior: [null],
    safetyAndSecurity: [null],
    driversAssistance: [null],
    illumination: [null],
    interior: [null],
    performance1: [null],
  });

  isFormSubmitted: boolean = false;

  get f() {
    return this.carForm.controls;
  }

  getCarDetails() {
    this.carService.getCarBrand().subscribe((res) => {
      console.log(res.data.results);
      // Array of unique car makes
      this.cars = [
        ...new Set(res.data.results.map((car: { make: any }) => car.make)),
      ];

      // Array of objects mapping models to makes
      this.models = res.data.results.map((car: { make: any; model: any }) => ({
        make: car.make,
        model: car.model,
      }));

      console.log(this.models);
      console.log(this.cars);
    });
  }

  getModel() {
    this.displayModels = this.models.filter(
      (model) => model.make === this.f.brand.value
    );
  }

  getAddress() {
    this.addressService.getAddress().subscribe((res) => {
      this.addressList = res;
    });
  }

  getAddressValue(value: string | null) {
    return this.addressList.find((res) => {
      value === res.summaryline;
      return res;
    });
  }

  postCar() {
    console.log(this.f.color.value);
    this.isFormSubmitted = true;
    if (this.carForm.invalid) {
      return;
    } else {
      const payload = {
        brand: this.f.brand.value,
        model: this.f.model.value,
        year: this.f.year.value,
        mileage: this.f.mileage.value,
        fuelEconomy: this.f.fuelEconomy.value,
        ulez: this.f.ulez.value,
        vehicleDescription: this.f.vehicleDescription.value,
        vehicleFeatures: this.f.vehicleFeatures.value,
        vehicleStats: this.f.vehicleStats.value,
        address: this.getAddressValue(this.f.address.value),
        price: this.f.price.value,
        isBiddable: this.f.isBiddable.value === 'Yes' ? true : false,
        marketType: this.f.marketType.value,
        owner: JSON.parse(localStorage.getItem('currentUser') || '{}').id,
        vehicleSummary: {
          driveTrain: this.f.driveTrain.value,
          milesDriven: this.f.milesDriven.value,
          fuelType: this.f.fuelType.value,
          seats: this.f.seats.value,
          doors: this.f.doors.value,
          carType: this.f.carType.value,
          transmission: this.f.transmission.value,
          color: this.f.color.value,
          registrationNumber: this.f.registrationNumber.value,
          owners: this.f.owners.value,
        },
        vehicleTechSpecs: {
          battery: this.f.battery.value,
          dimensions: this.f.dimensions.value,
          engineAndDriveTrain: this.f.engineAndDriveTrain.value,
          general: this.f.general.value,
          performance: this.f.performance.value,
        },
        vehicleStandardEquipment: {
          audioAndCommunicatons: this.f.audioAndCommunicatons.value,
          exterior: this.f.exterior.value,
          safetyAndSecurity: this.f.safetyAndSecurity.value,
          driversAssistance: this.f.driversAssistance.value,
          illumination: this.f.illumination.value,
          interior: this.f.interior.value,
          performance: this.f.performance1.value,
        },
      };
      this.carService.postCar(payload).subscribe((res) => {});
    }
  }
}
