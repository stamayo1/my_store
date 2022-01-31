import { Component, OnInit } from '@angular/core';
import { Product} from '../../models/Product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  myShoppingCart: Product[] = []; 
  total = 0;

  constructor(
    private storeservice: StoreService,
    private productService: ProductsService
    ){
      
      this.myShoppingCart = this.storeservice.getShoppingCart();
  }

  ngOnInit(): void {

    this.productService.getAllProducts().
    subscribe(data =>{
      this.products = data;
    })

  }

  onAddShoppingCart(product: Product){
    this.storeservice.addProduct(product);
    this.total = this.storeservice.getTotal();
  }
}
