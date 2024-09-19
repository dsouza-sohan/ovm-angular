import { Component } from '@angular/core';
import { NavbarComponent } from '../../non-auth/navbar/navbar.component';
import { FooterComponent } from '../../non-auth/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Modal1Component } from '../../../shared/components/modal/modal.component';
import { BidModalCompComponent } from '../../../shared/components/bid-modal-comp/bid-modal-comp.component';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterModule,
    Modal1Component,
    BidModalCompComponent,
  ],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss',
})
export class SharedComponent {}
