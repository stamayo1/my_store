import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext, 
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {TokenService} from '../services/token.service';

const CHECK_TIME = new HttpContextToken<boolean>(() => false); 

// Contexto que se carga en los request para validar si realizar o no, algo con el interceptor
export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true)
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenservices: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // CONTEXTO
    // if (request.context.get(CHECK_TIME)){
    //   request = this.addTokenHeader(request);
    //   return next.handle(request);
    // }

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
