import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

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

loginUser(data: any){
  return this.http.post(`${environment.apiUrl}${environment.route}${environment.version}/auth/login`, data)
}

}
