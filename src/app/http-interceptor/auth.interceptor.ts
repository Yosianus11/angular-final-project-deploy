import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    const authToken = this.authService.getToken()
    request = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })

    return next.handle(request);
  }
}
