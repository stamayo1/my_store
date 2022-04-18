import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  savetoken(token: string){
    localStorage.setItem('token', token); 
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}

