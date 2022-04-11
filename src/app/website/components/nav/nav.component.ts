import { Component, OnInit } from '@angular/core';

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

  constructor(
    private storeService: StoreService,
    private authservice : AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {

    // Subscribirse al store
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length; 
    })

    this.getAllCategories();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  login(){
    this.authservice.login("john@mail.com", "changeme")
    .subscribe(response => {
      this.profile = response; 
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }
}
