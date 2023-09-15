import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FileUploadResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from 'types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  public saveUserToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getUserToken(key: string) {
    return localStorage.getItem(key)
  }
  public removeUserToken(key: string) {
    localStorage.removeItem(key);
  }

  public clearUserToken() {
    localStorage.clear();
  }

loginUser(data: LoginRequest){
  return this.http.post<LoginResponse>(`${environment.apiUrl}${environment.route}${environment.version}/auth/login`, data)
}
registerUser(data: RegisterRequest){
  return this.http.post<RegisterResponse>(`${environment.apiUrl}${environment.route}${environment.version}/users`, data)
}
uploadFile(data: any){
  return this.http.post<FileUploadResponse>(`${environment.apiUrl}${environment.route}${environment.version}/files/upload`, data)
}

}
