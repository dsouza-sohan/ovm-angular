import {
  Component,
  ContentChild,
  inject,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Modal1Component } from '../../../shared/components/modal/modal.component';
import { ModalService } from '../../../core/services/modal.service';
import { AuthService } from '../../../core/services/auth.service';
import { DropdownModule } from '@coreui/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ovm-navbar',
  standalone: true,
  imports: [MatIcon, DropdownModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  loggedInUserDetails: any;

  searchCar: any;

  constructor(private _modalService: ModalService, private router: Router) {
    this.authService.getUserDetails().subscribe((res) => {
      console.log(res);
      this.loggedInUserDetails = res;
    });
  }
  private authService = inject(AuthService);

  openLoginModal() {
    this._modalService.updateQuote(true);
  }

  openLogoutModal() {
    this.authService.logout();
    this.router.navigate(['/dashboard']);
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  toDashboard() {
    this.router.navigate(['/']);
  }

  searchCars() {
    console.log('here', this.searchCar);
    this.router.navigate(['/search-car', this.searchCar]);
  }
}
