import { Injectable, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    @Inject(DOCUMENT) private _doc: Document
  ) { }

  savetoken(token: string): void{
    
    this.getWindow()?.localStorage.setItem('token', token);
  }

  getToken(){
    const val =  this.getWindow()?.localStorage?.getItem('token');
    
    return val
  }

  removeToken(): void{

    this.getWindow()?.localStorage.removeItem('token');
  }

  private getWindow(): Window | null {

    return this._doc.defaultView;
  }

}

