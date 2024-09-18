import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  FormSelectDirective,
  FormModule,
  ButtonDirective,
  GridModule,
} from '@coreui/angular';
import { AddressService } from '../../../core/services/address.service';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [
    FormSelectDirective,
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonDirective,
    GridModule,
  ],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.scss',
})
export default class EditCarComponent implements OnInit {
  private carService = inject(CarService);
  private addressService = inject(AddressService);
  cars: any[] = [];
  models: any[] = [];
  displayModels: any[] = [];
  addressList: any[] = [];
  carDetails: any;
  private route = inject(ActivatedRoute);
  carId!: string;

  constructor(private fb: FormBuilder) {
    this.getCarDetails();
    this.getAddress();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.carId = params.get('id')!;
      console.log(this.carId, 'carid');
      this.getCarById();
    });

    this.carForm?.get('brand')?.valueChanges.subscribe((res) => {
      console.log('value changed');
      this.getModel();
    });
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
    isBiddable: ['', Validators.required],
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
    console.log('brand changed');
    this.displayModels = this.models.filter(
      (model) => model.make === this.f.brand.value
    );

    this.carForm.patchValue({
      brand: this.carDetails.brand,
      model: this.carDetails.model,
    });
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

  getCarById() {
    this.carService.getCarById(this.carId).subscribe((res) => {
      this.carDetails = res.data;

      this.setEditForm();
    });
  }

  setEditForm() {
    this.carForm.patchValue({
      brand: this.carDetails.brand,
      year: this.carDetails.year,
      mileage: this.carDetails.mileage,
      fuelEconomy: this.carDetails.fuelEconomy,
      ulez: this.carDetails.ulez,
      vehicleDescription: this.carDetails.vehicleDescription,
      vehicleFeatures: this.carDetails.vehicleFeatures,
      vehicleStats: this.carDetails.vehicleStats,
      address: this.carDetails.address.summaryline,
      price: this.carDetails.price,
      isBiddable: this.carDetails.isBiddable ? 'Yes' : 'No',
      marketType: this.carDetails.marketType,

      driveTrain: this.carDetails.vehicleSummary.driveTrain,
      milesDriven: this.carDetails.vehicleSummary.milesDriven,
      fuelType: this.carDetails.vehicleSummary.fuelType,
      seats: this.carDetails.vehicleSummary.seats,
      doors: this.carDetails.vehicleSummary.doors,
      carType: this.carDetails.vehicleSummary.carType,
      transmission: this.carDetails.vehicleSummary.transmission,
      color: this.carDetails.vehicleSummary.color,
      registrationNumber: this.carDetails.vehicleSummary.registrationNumber,
      owners: this.carDetails.vehicleSummary.owners,

      battery: this.carDetails.vehicleTechSpecs.battery,
      dimensions: this.carDetails.vehicleTechSpecs.dimensions,
      engineAndDriveTrain: this.carDetails.vehicleTechSpecs.engineAndDriveTrain,
      general: this.carDetails.vehicleTechSpecs.general,
      performance: this.carDetails.vehicleTechSpecs.performance,

      audioAndCommunicatons:
        this.carDetails.vehicleStandardEquipment.audioAndCommunicatons,
      exterior: this.carDetails.vehicleStandardEquipment.exterior,
      safetyAndSecurity:
        this.carDetails.vehicleStandardEquipment.safetyAndSecurity,
      driversAssistance:
        this.carDetails.vehicleStandardEquipment.driversAssistance,
      illumination: this.carDetails.vehicleStandardEquipment.illumination,
      interior: this.carDetails.vehicleStandardEquipment.interior,
      performance1: this.carDetails.vehicleStandardEquipment.performance,
    });
  }

  postCar() {
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
        user_id: JSON.parse(localStorage.getItem('currentUser') || '{}').id,
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
      this.carService
        .updateCar(payload, this.carDetails._id)
        .subscribe((res) => {});
    }
  }
}
