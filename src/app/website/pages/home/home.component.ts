import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; 

import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products : Product[] = []; 
  productId : string | null = null; 
  limit: number = 10;
  offset: number = 0;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.loadProducts(); 

    // Read query params
    this.route.queryParamMap
    .subscribe((params)=>{
      this.productId = params.get("product");
    })
  }

  loadProducts(){
    this.productService.getProducts(this.limit, this.offset)
    .subscribe( data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }

}
