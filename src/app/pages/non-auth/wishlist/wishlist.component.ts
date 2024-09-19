import { Component, inject } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export default class WishlistComponent {
  wishlist: any;
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  constructor() {
    this.getWishlistItem();
  }

  getWishlistItem() {
    this.wishlistService
      .getWishlistItemId(
        JSON.parse(localStorage.getItem('currentUser') || '{}').id
      )
      .subscribe((res) => {
        this.wishlist = res.data;
      });
  }

  addToCart(carId: any, id: any) {
    this.cartService
      .addToCart(
        carId,
        JSON.parse(localStorage.getItem('currentUser') || '{}').id
      )
      .subscribe((res) => {
        this.wishlistService.removeFromWishlistByid(id).subscribe((res) => {
          window.location.reload();
        });
      });
  }
}
