import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {TokenService} from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenservices: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addTokenHeader(request);
    return next.handle(request);
  }

  // Se ejecuta antes de que se responda
  private addTokenHeader(request: HttpRequest<unknown>){
    
    const token = this.tokenservices.getToken();
    
    if(token){
      // Modifica todos los request realizados para añadir
      // el token de autenticacion para el backend
      
      const authReqt = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      return authReqt;
    }

    return request;
  }
}
