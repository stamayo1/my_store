import { Component, OnInit } from '@angular/core';
import { Product} from '../../models/Product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products: Product[] = []; 

  categoryId: string | null = null; 
  limit: number = 10;
  offset: number = 0;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }


  ngOnInit(): void {
    
    // Nombre del param que se le esta pasando por la URL

    // Before: Doble subscribe = Callback
    // this.route.paramMap.subscribe((params) => {
    //   this.categoryId = params.get("id");
    //   this.loadProducts()
    // })

    // After: un solo subscribe

    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get("id");
        
        if(this.categoryId){
          return this.productService.getByCategory(this.categoryId, this.limit, this.offset); 
        }

        return [];
      })
    ).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }


  loadProducts(){
    
    if(this.categoryId){
      this.offset += this.limit;

      this.productService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe( data => {
        this.products = this.products.concat(data);
      })
    }
  }

}
