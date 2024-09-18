import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss',
})
export default class SearchCarComponent {
  carBrand: any;
  cars: any = [];

  private carService = inject(CarService);

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.carBrand = params.get('id')!;
      this.getCars();
    });
  }

  getCars() {
    this.carService.getCars({ brand: this.carBrand }).subscribe((res) => {
      console.log(res);
      this.cars = res.data;
    });
  }
  carDetails(car: any) {
    console.log(car);
    this.router.navigate(['/car-details', car._id]);
  }
}
