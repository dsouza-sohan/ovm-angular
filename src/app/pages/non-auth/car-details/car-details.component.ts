import { Component, inject } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import PopularComponent from '../popular/popular.component';
import FeaturedComponent from '../featured/featured.component';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [RouterModule, CommonModule, PopularComponent, FeaturedComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export default class CarDetailsComponent {
  private carService = inject(CarService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
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
    this.carService
      .getCarById(
        this.carId,
        JSON.parse(localStorage.getItem('currentUser') || '{}').id
      )
      .subscribe((res) => {
        this.carDetails = res.data;
        this.recommended = this.carDetails.recommended;
        console.log('recommended', this.recommended);
      });
  }

  addToCart(carId: any) {
    this.cartService
      .addToCart(
        carId,
        JSON.parse(localStorage.getItem('currentUser') || '{}').id
      )
      .subscribe((res) => {
        window.location.reload();
      });
  }

  gotToCart() {
    this.router.navigate(['/cart']);
  }

  addToWishlist(carId: any) {
    this.wishlistService
      .addToWishlist(
        carId,
        JSON.parse(localStorage.getItem('currentUser') || '{}').id
      )
      .subscribe((res) => {
        window.location.reload();
      });
  }

  removeToWishlist(wishlistId: any) {
    this.wishlistService.removeFromWishlistByid(wishlistId).subscribe((res) => {
      window.location.reload();
    });
  }
}
