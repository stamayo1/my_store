import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  // De esta forma inicializamos un producto que viene externo, con el 
  // signo de exclamación indicamos que la propiedad existira y que no sera nula
  @Input('product') product!: Product ;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }
  
}
