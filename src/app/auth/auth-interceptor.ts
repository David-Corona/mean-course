import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";

@Injectable() // to inject authService
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) { // req intercepting
    const authToken = this.authService.getToken();
    const authRequest = req.clone({ // should first clone the request to avoid problems
      headers: req.headers.set('Authorization', "Bearer " +  authToken) // adds a new header or overwrites if exists
    });
    return next.handle(authRequest); // => Adding the token to Authorization header
  }
}
