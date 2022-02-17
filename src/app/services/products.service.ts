import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/Product.model';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  
  constructor(
    private client: HttpClient){ 
  }

  getProducts(limit?: number, offset?: number){
    let params = new HttpParams(); 
    
    if (limit !== undefined && offset !== undefined) { 
      // Paginar: cantidad de elementos, punto de partida
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.client.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3) // Reintentar la solicitud maximo 3 veces, en caso de que la primera falla
    );
    
  }

  getProduct(id: string){
    // Get Array of products
    return this.client.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO){
    // New product
    return this.client.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    // Update total or partial data of product
    return this.client.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string){
    // Delete Product
    return this.client.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
