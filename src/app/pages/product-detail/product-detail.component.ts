import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/services/products.service";
import { switchMap } from "rxjs/operators";

import { Product } from "../../models/Product.model";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  productId: string | null = null;

  statusDetail: "loading" | "success" | "error" | "init" = "init";

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          // Nombre del param al que se accederá
          this.productId = params.get("id");

          if (this.productId) {
            return this.productService.getProduct(this.productId);
          }

          return [null];
        })
      )
      .subscribe({
        next: (data) => {
          this.product = data;
          this.statusDetail = "success";
        },
        error: (response) => {
          // console.log(response.error.message);
          this.statusDetail = "error";
        },
      });
  }

  goToBack(){
    this.location.back();
  }
}
