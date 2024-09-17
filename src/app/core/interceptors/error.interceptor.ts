import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(SpinnerService);
  const toastr = inject(ToastrService);
  busyService.busy();

  return next(req).pipe(
    tap({
      next: (event: any) => {
        console.log(event);
        if (event?.body?.message) {
          toastr.success(event?.body?.message, event?.statusText);
        }
      },
      error: (error) => {
        toastr.error(error.error.message, error.statusText);
      },
    }),
    finalize(() => {
      busyService.idle();
    })
  );
  // catchError(err => {
  //   console.log(err);
  //   //Handle http errors according to their status codes
  //   if (err.status === 0) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: err.error.message,
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //   } else if (err.status === 401) {

  //   } else if (err.status === 422) {

  //   } else if (err.status === 500) {

  //   } else if (err.status === 402) {

  //   }

  //   const error = err.error.message || err.statusText;
  //   return throwError(error);
  // }));
};
