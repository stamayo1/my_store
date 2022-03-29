import { Component, OnInit } from '@angular/core';
import { Product} from '../../models/Product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products : Product[] = []; 
  limit: number = 10;
  offset: number = 0;

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    
    this.loadProducts()
  }

  loadProducts(){
    this.productService.getProducts(this.limit, this.offset)
    .subscribe( data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }

}
