import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from './api.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(ApiService);
  loading.startLoading();

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      loading.stopLoading();
    })
  );
};