import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LoginResponse } from 'types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
onSubmit(){
  this.authService.loginUser(this.loginForm.value).subscribe((res:LoginResponse)=>{
    if(res.access_token){
      this.authService.saveUserToken('token', res.access_token);
      this.router.navigate(['./dashboard/products']);
    }
  })
}
toRegisterRoute(){
  this.router.navigate(['/register'])
}
}
