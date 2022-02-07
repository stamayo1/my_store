import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  
  constructor(
    private client: HttpClient){ 

  }

  getAllProducts(){
    // Get Array of products
    return this.client.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string){
    // Get Array of products
    return this.client.get<Product>(`${this.apiUrl}/${id}`);
  }
}
