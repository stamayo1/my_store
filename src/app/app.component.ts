import { Component } from '@angular/core';
import { Product} from './models/Product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  imgParent:string = '';
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

  onLoaded(img_loaded:string){
    console.log('load parent', img_loaded);
  }
}
