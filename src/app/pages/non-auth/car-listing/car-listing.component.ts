import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { Router, RouterModule } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'ovm-car-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-listing.component.html',
  styleUrl: './car-listing.component.scss',
})
export class CarListingComponent {
  private carService = inject(CarService);
  cars: any;

  carType = [
    {
      name: 'All',
      isActive: true,
    },
    {
      name: 'Hatchback',
      isActive: false,
    },
    {
      name: 'SUV',
      isActive: false,
    },
    {
      name: 'Sedan',
      isActive: false,
    },
    {
      name: 'Van',
      isActive: false,
    },
    {
      name: 'Pickup',
      isActive: false,
    },
  ];

  changeActive(type: string) {
    this.carType.map((car) => {
      if (car.name === type) {
        car.isActive = true;
      } else {
        car.isActive = false;
      }

      return car;
    });

    this.getCars();
  }

  constructor(private router: Router, private _modalService: ModalService) {
    this.getCars();
  }

  getCars() {
    var carType: string | undefined = this.carType.filter(
      (car) => car.isActive
    )[0].name;
    if (carType === 'All') {
      carType = undefined;
    }
    this.carService.getCars({ carType }).subscribe((res) => {
      console.log(res);
      this.cars = res.data;
    });
  }

  carDetails(car: any) {
    console.log(car);
    if (JSON.parse(localStorage.getItem('currentUser') || '{}')) {
      return this._modalService.updateQuote(true);
    }
    this.router.navigate(['/car-details', car._id]);
  }
}
