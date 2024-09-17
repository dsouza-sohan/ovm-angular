import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = `Bearer ${
    JSON.parse(localStorage.getItem('currentUser') || '{}').token
  }`;
  const newReq = req.clone({
    headers: req.headers.append('Authorization', authToken),
  });
  return next(newReq);
};
