import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export default class FeaturedComponent {
  private carService = inject(CarService);
  cars: any;

  constructor(private router: Router) {
    this.getCars();
  }

  getCars() {
    this.carService.getCars({ marketType: 'Featured' }).subscribe((res) => {
      console.log(res);
      this.cars = res.data;
    });
  }

  carDetails(car: any) {
    console.log(car);
    this.router.navigate(['/car-details', car._id]);
  }
}
