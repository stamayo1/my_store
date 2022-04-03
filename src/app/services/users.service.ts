import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';
import {User, CreateUserDTO} from '../../app/models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(
    private client: HttpClient) { 
  }

  create(dto: CreateUserDTO){
    return this.client.post<User>(this.apiUrl, dto);
  }

  getAll(){
    return this.client.get<User[]>(this.apiUrl);
  }
}
