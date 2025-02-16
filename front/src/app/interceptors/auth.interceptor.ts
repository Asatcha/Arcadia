import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor {
  static intercept: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn,
  ): Observable<HttpEvent<any>> => {
    const clonedRequest = req.clone({ withCredentials: true });

    return next(clonedRequest);
  };
}
