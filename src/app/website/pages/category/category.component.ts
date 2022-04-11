import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/Product.model";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/services/products.service";


import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  
  products: Product[] = [];
  productId : string | null = null;
  categoryId: string | null = null;

  limit: number = 10;
  offset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    // Before: Doble subscribe = Callback
    // this.route.paramMap.subscribe((params) => {
    //   this.categoryId = params.get("id");
    //   this.loadProducts()
    // })

    // Read params of URL
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          // Nombre del param al que se accederá
          this.categoryId = params.get("id");

          if (this.categoryId) {
            return this.productService.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }

          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
    
    // Read query params of URL
    this.route.queryParamMap
    .subscribe((params)=>{
      this.productId = params.get("product");
    })

  }

  loadProducts() {

    if (this.categoryId) {
      
      this.productService
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }
}
