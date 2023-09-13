import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

loginUser(data: any){
  return this.http.post(`${environment.apiUrl}${environment.route}${environment.version}/auth/login`, data)
}

}
