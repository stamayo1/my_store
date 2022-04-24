import { Component, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {filter, map} from 'rxjs/operators';

// import {FilesService} from './services/files.service'; 

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

import { VersionReadyEvent } from './models/sw.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService, 
    private swUpdate: SwUpdate
  ){
  }


  ngOnInit(){
    //Continuar con la sesion
    const token = this.tokenService.getToken()
    
    if(token){
      this.authService.getprofile()
      .subscribe();
    }
    
    this.updatePwa();
  }

  updatePwa(){
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })))
      .subscribe();
  }

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
