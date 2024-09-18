import { Component, inject } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import PopularComponent from '../popular/popular.component';
import FeaturedComponent from '../featured/featured.component';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [RouterModule, CommonModule, PopularComponent, FeaturedComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export default class CarDetailsComponent {
  private carService = inject(CarService);
  carDetails: any;
  carId: any;
  recommended: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.carId = params.get('id')!;
      this.getCarDetails();
    });
  }

  getCarDetails() {
    this.carService.getCarById(this.carId).subscribe((res) => {
      this.carDetails = res.data;
      this.recommended = this.carDetails.recommended;
      console.log('recommended', this.recommended);
    });
  }
}
