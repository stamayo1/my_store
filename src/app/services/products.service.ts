import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/Product.model';

import { zip } from 'rxjs';
import { retry, switchMap} from 'rxjs/operators';

import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;
  
  constructor(
    private client: HttpClient){ 
  }

  getProducts(limit?: number, offset?: number){
    let params = new HttpParams(); 
    
    if (limit && offset !== undefined) { 
      // Paginar: cantidad de elementos, punto de partida
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.client.get<Product[]>(`${this.apiUrl}/products`, {params})
    .pipe(
      retry(3) // Reintentar la solicitud maximo 3 veces, en caso de que la primera falla
    );
    
  }

  getProduct(id: string){
    // Get Array of products
    return this.client.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getByCategory(categoryId: string, limit?: number, offset?: number){
    // Get all products order by category
    let params = new HttpParams(); 
    
    if (limit && offset !== undefined) { 
      // Paginar: cantidad de elementos, punto de partida
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.client.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
    .pipe(
      retry(3) // Reintentar la solicitud maximo 3 veces, en caso de que la primera falla
    );
    
  }

  create(dto: CreateProductDTO){
    // New product
    return this.client.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    // Update total or partial data of product
    return this.client.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string){
    // Delete Product
    return this.client.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  


  // Ejemplo manejo de  callbacks
  readupdate(id: string){

    // Callback de forma optima, 
    this.getProduct(id)
    .pipe(
      // se usa cuando una tarea depende de la respuesta de otra
      switchMap((product) => {
        return this.update(product.id, {title: 'nuevo'})
      }), 

    ).subscribe(data => {
      console.log(data); 
    })

    // Ejecutar 2 tareas de forma paralela, que no tienen
    // depencia una de otra, retorna un array con las respuestas
    zip(
      this.getProduct(id),
      this.update(id, {title: 'change'})
    ).subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  
}
