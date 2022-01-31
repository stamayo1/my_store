import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private client: HttpClient){ 

  }

  getAllProducts(){
    // Get Array of products
    return this.client.get<Product[]>('https://fakestoreapi.com/products');
  }
}
