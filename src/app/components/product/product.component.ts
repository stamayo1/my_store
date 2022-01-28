import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // De esta forma inicializamos un producto que viene externo, con el 
  // signo de exclamación indicamos que la propiedad existira y que no sera nula
  @Input('product') product!: Product ;

  constructor() { }

  ngOnInit(): void {
  }

}
