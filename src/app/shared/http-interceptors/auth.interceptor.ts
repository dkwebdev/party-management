import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly excludedUrl = 'https://ap.greatfuturetechno.com/login/';
  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Send resquest without Token.
    if (req.url === this.excludedUrl) {
      return next.handle(req);
    }

    //Modified Send resquest With Token.
    const token = JSON.parse(localStorage.getItem('token') || '');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
