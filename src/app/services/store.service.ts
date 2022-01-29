import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = []; 

  constructor() { }

  addProduct(product: Product){
    this.myShoppingCart.push(product); 
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart(){
    return this.myShoppingCart ;
  }
}
