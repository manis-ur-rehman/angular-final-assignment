import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AddProductRequest, Category, ProductResponse, editProductRequest } from 'types';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private http:HttpClient) { }

getAllProducts(offset: number, limit: number){
 return this.http.get(`${environment.apiUrl}${environment.route}${environment.version}/products/?offset=${offset}&limit=${limit}`)
}

getProductByPagination(offset: number, limit: number){
  return this.http.get(`${environment.apiUrl}${environment.route}${environment.version}/products/?offset=${offset}&limit=${limit}`)
}

getProductById(id: number){
  return this.http.get<ProductResponse>(`${environment.apiUrl}${environment.route}${environment.version}/products/${id}`)
}

addProduct(data: AddProductRequest){
  return this.http.post<ProductResponse>(`${environment.apiUrl}${environment.route}${environment.version}/products`, data)
}

editProduct(data: editProductRequest, id: number){
  return this.http.put<ProductResponse>(`${environment.apiUrl}${environment.route}${environment.version}/products/${id}`, data)
}

categoryList(){
  return this.http.get<Array<Category>>(`${environment.apiUrl}${environment.route}${environment.version}/categories`);
}

}
