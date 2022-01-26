import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent:string = '';

  onLoaded(img_loaded:string){
    console.log('load parent', img_loaded);
  }
}
