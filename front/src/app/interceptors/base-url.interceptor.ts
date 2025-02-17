import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseUrlInterceptor {
  static intercept: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn,
  ): Observable<HttpEvent<any>> => {
    const baseUrl = environment.apiUrl;

    const clonedRequest = req.clone({ url: `${baseUrl}${req.url}` });
    return next(clonedRequest);
  };
}
