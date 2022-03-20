import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Auth} from '../../app/models/auth.model';
import {User} from '../../app/models/user.model';
import {TokenService} from '../../app/services/token.service';

import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private client: HttpClient,
    private tokenservice: TokenService) { 
  }

  login(email: string, password: string){
    return this.client.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => 
        this.tokenservice.savetoken(response.access_token)
      ),
      switchMap(() => this.getprofile()),
    );
  }

  getprofile(){
    // const headers =  new HttpHeaders(); 
    // headers.set('Authorization', `Bearer ${token}`); 
    // return this.client.get<User>(`${this.apiUrl}/profile`, {headers});
    
    // Conseguir el perfil del usuario logueado
    return this.client.get<User>(`${this.apiUrl}/profile`);
  }

}
