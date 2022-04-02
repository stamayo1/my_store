import { Injectable } from '@angular/core';
import { Category } from '../models/category.models';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  private api_url = `${environment.API_URL}/api/categories`; 

  constructor(
    private client: HttpClient
  ) { }

  getAll(limit?: number, offset?: number){
    let params = new HttpParams(); 
    
    if (limit && offset !== undefined) { 
      // Paginar: cantidad de elementos, punto de partida
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.client.get<Category[]>(this.api_url, {params});
  }
}
