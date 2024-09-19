import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export default class PopularComponent {
  private carService = inject(CarService);
  cars: any;

  constructor(private router: Router, private _modalService: ModalService) {
    this.getCars();
  }

  getCars() {
    this.carService.getCars({ marketType: 'Popular' }).subscribe((res) => {
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
