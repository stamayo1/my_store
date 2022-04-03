import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product} from '../../models/Product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter(); 
  @Input() set productId(id: string | null){
    if (id){
      this.onShowDetail(id);
    }
  }
 
  myShoppingCart: Product[] = []; 
  amount = 0;
  showProductDetail = false; 
  productChosen!: Product;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  
  constructor(
    private storeservice: StoreService,
    private productService: ProductsService
    ){
      
      this.myShoppingCart = this.storeservice.getShoppingCart();
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
    
    if(!this.showProductDetail){
      // Si esta cerrado el toogle, lo abrirá, en caso contrario, conserva el estado
      this.showProductDetail = true;
    }

    this.productService.getProduct(id)
    .subscribe({
      next: (data) => {
        // this.toggleProductDetail();
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

  onLoadMore(){
    // Event Biding
    this.loadMore.emit(); 
  }


}
