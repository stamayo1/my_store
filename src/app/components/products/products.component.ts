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
  amount = 0;
  showProductDetail = false; 
  productChosen!: Product;

  limit: number = 10;
  offset: number = 0;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  
  constructor(
    private storeservice: StoreService,
    private productService: ProductsService
    ){
      
      this.myShoppingCart = this.storeservice.getShoppingCart();
  }

  ngOnInit(): void {

    this.loadMore();
  }

  onAddShoppingCart(product: Product){
    this.storeservice.addProduct(product);
    this.amount = this.storeservice.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading'; 

    this.productService.getProduct(id)
    .subscribe({
      next: (data) => {
        this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      }, 
      error: (response) => {
        // console.log(response.error.message); 
        this.statusDetail = 'error';
        console.log(response.message)
      }
    });
    
    // Depreciado si se va hacer un manejo de errores 
    // .subscribe(data => {
    //   this.toggleProductDetail();
    //   this.productChosen = data;
    //   this.statusDetail = 'success';
    // });
  }


  loadMore(){
    this.productService.getProducts(this.limit, this.offset)
    .subscribe( data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }


}
