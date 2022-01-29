import { Component, OnInit } from '@angular/core';
import { Product} from '../../models/Product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      id: '1',
      name: 'Las mejores gafas',
      price: 565,
      image: './assets/images/glasses.webp'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.webp'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.webp'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.webp'
    },
  ];

  myShoppingCart: Product[] = []; 
  total = 0;

  constructor(
    private storeservice: StoreService){
    this.myShoppingCart = this.storeservice.getShoppingCart();
  }

  ngOnInit(): void {
  }

  onAddShoppingCart(product: Product){
    this.storeservice.addProduct(product);
    this.total = this.storeservice.getTotal();
  }
}
