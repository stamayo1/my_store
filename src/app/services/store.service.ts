import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = []; 
  // Intancia de un observador
  private myCart = new BehaviorSubject<Product[]>([]);

  // Definicion de un subscriptor del observador
  myCart$ = this.myCart.asObservable()

  constructor(  ) { }

  addProduct(product: Product){
    
    this.myShoppingCart.push(product);

    // Transmitir información a los que estan subscritos
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(){
    // Total amount 
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart(){
    // List of current product on shopping cart
    return this.myShoppingCart ;
  }
}
