import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  ButtonDirective,
  ButtonGroupComponent,
  FormCheckLabelDirective,
  FormControlDirective,
  FormLabelDirective,
  FormSelectDirective,
} from '@coreui/angular';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'ovm-slider',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ButtonDirective,
    CommonModule,
    // FormControlDirective,
    // FormLabelDirective,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  constructor(private fb: FormBuilder, private router: Router) {
    this.getCarDetails();
  }

  private carService = inject(CarService);
  cars: any[] = [];
  models: any[] = [];
  displayModels: any[] = [];

  searchForm = this.fb.group({
    bidBuyCar: ['buy'],
    brand: [null],
    model: [null],
    budgetBrand: ['budget'],
    price: [50000],
  });

  isFormSubmitted: boolean = false;

  get f() {
    return this.searchForm.controls;
  }

  setRadioValue(value: string): void {
    this.f.bidBuyCar.setValue(value);
    console.log(this.f.bidBuyCar.value);
  }

  getRadioValue() {
    return this.f.bidBuyCar.value;
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

  advanceSearch() {
    if (this.searchForm.invalid) {
      return false;
    } else {
      console.log(this.searchForm);
      // this.carService.getCars().subscribe()
      return true;
    }
  }
}
