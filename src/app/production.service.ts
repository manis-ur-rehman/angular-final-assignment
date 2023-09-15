import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { getProductResponse } from 'types';

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
  return this.http.get<getProductResponse>(`${environment.apiUrl}${environment.route}${environment.version}/products/${id}`)
}

}
