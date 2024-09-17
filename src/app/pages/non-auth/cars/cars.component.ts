import { Component } from '@angular/core';
import { CarListingComponent } from '../car-listing/car-listing.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarListingComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export default class CarsComponent {}
