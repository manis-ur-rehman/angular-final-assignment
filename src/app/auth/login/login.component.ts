import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ErrorType, LoginResponse } from 'types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading:boolean = false;
  error: ErrorType = {
    statusCode: '',
    message: ''
  }
  loginForm!: FormGroup
  authService: AuthService = inject(AuthService);
constructor(public loginFormBuilder: FormBuilder, private router: Router){

}

ngOnInit() {
  this.loginForm = this.loginFormBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
    password: new FormControl<any>('', [Validators.required]),
  })
}
get loginFormControls(){
  return this.loginForm.controls
}

successResponse(res:LoginResponse){
  
}
onSubmit(){
  this.loading = true;
  this.error = {
    statusCode: '',
    message: ''
  }
  this.authService.loginUser(this.loginForm.value).subscribe((res: LoginResponse)=>{
    this.loading = false;
    if(res.access_token){
      this.authService.saveUserToken('token', res.access_token);
      this.router.navigate(['./dashboard/products']);
    }
  }, (error: ErrorType)=>{
    this.error = error
    this.loading = false;
  
  })
}
toRegisterRoute(){
  this.router.navigate(['/register'])
}
}
