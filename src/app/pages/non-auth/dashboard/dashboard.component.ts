import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { CarListingComponent } from '../car-listing/car-listing.component';
import { FooterComponent } from '../footer/footer.component';
import { ButtonDirective } from '@coreui/angular';
import {
  PopoverModule,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
} from '@coreui/angular';
import PopularComponent from '../popular/popular.component';
import FeaturedComponent from '../featured/featured.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    NavbarComponent,
    SliderComponent,
    CarListingComponent,
    FooterComponent,
    ButtonDirective,
    PopoverModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    PopularComponent,
    FeaturedComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  emailLogin: string = '';
  constructor() {}

  onSignOut() {
    // this.api.signOut().subscribe(() => {
    //   localStorage.removeItem('emailInput');
    //   this.router.navigate(['/']);
    // });
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  data1 = [
    {
      title: 'Tata Safari XZA Plus Gold AT',
      price: 'Rs 23.17 Lakh',
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/New-Safari/8376/Tata-New-Safari-XZA-Plus-Adventure-Edition-AT/1614147643555/front-left-side-47.jpg',
    },
    {
      title: 'Kia Carnival',
      price: 'Rs 24.95 - 33.99 Lakh',
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/Carnival/7015/1589535511670/front-left-side-47.jpg',
    },
    {
      title: 'BMW X5',
      price: 'Rs 76.50 - 88.00 Lakh',
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/BMW-X5/6455/1558002027816/front-left-side-47.jpg',
    },
    {
      title: 'Hyundai Alcazar Platinum 7-Seater',
      price: 'Rs 19.63 Lakh',
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Alcazar/8459/1624013603874/front-left-side-47.jpg',
    },
  ];
}
