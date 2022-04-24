import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: Category[] = []; 
  showMenu: boolean = false; 
  counter: number =  0; 
  profile : User | null = null; 

  installEvent: any  = null;

  constructor(
    private storeService: StoreService,
    private authservice : AuthService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Subscribirse al store
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length; 
    })

    this.authservice.user$.subscribe(data => {
      this.profile = data; 
    })

    this.getAllCategories();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  login(){
    this.authservice.login("john@mail.com", "changeme")
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }


  logout(){
    this.authservice.logout();
    this.profile = null; 
    this.router.navigate(['/home']);
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeProompt(event: Event){
    event.preventDefault();
    this.installEvent = event; 
  }

  installByUser(){
    if (this.installEvent){
      //Lanzar el evento que le da la opción de instalar la app
      this.installEvent.prompt(); 

      //Saber que escogio el usuario
      this.installEvent.userChoice
      .then((response:any) => {
        if (response.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      })
    }
  }

}
