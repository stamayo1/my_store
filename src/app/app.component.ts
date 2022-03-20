import { Component } from '@angular/core';
// import {FilesService} from './services/files.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // img_rta : string | null =  null; 

  // constructor(
  //   private fileService : FilesService
  // ){}

  // download(){
  //   var url_1 = 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf' ; 
  //   var url_2 = '../assets/files/test.pdf';   

  //   this.fileService.getFile('my.pdf',url_1, 'application/pdf')
  //   .subscribe()
  // }

  // onUpload(event: Event){
  //   const element = event.target as HTMLInputElement;
  //   const file = element.files?.item(0);
  //   if (file){
  //     this.fileService.uploadFile(file)
  //     .subscribe(rta => {
  //       this.img_rta = rta.location;
  //     })
  //   }
    
  // }
}
