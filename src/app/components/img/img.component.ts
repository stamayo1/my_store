import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent {

  img: string = ''; 
  imageDefault: string = "./assets/images/galeria.png";

  @Input('img') set changeImge(newimg: string){
    // Escucha solo los cambios de este input 
    this.img = newimg;
  }

  // Comunicar eventos al padre
  @Output() loaded = new EventEmitter<string>(); 

  constructor() { }

  imgError() {
    // Si no incuentra la url/ img, entonces va a mostrar la imagen por defecto
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // Si la operación es exitosa y deseo notificar al padre hago
    this.loaded.emit(this.img);
  }
}
