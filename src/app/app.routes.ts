import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { SharedComponent } from './pages/shared/shared/shared.component';

export const routes: Routes = [
  // {
  //     path: '',
  //     component: DashboardComponent
  // },
  {
    path: 'signup',
    component: RegistrationComponent,
  },
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/non-auth/dashboard/dashboard.component'),
      },
      {
        path: 'cars',
        loadComponent: () => import('./pages/non-auth/cars/cars.component'),
      },
      {
        path: 'car-details/:id',
        loadComponent: () =>
          import('./pages/non-auth/car-details/car-details.component'),
      },
      {
        path: 'post-car',
        loadComponent: () =>
          import('./pages/non-auth/post-car/post-car.component'),
      },
    ],
  },
];
