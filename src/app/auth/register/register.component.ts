import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ErrorType, FileUploadResponse, RegisterRequest, RegisterResponse } from 'types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading:boolean = false;
  error: ErrorType = {
    statusCode: '',
    message: ''
  }
  imageSrc: string = '';
  authService: AuthService = inject(AuthService);
  
  constructor(public registerFormBuilder: FormBuilder, public router: Router){}
  registerForm!: FormGroup;

ngOnInit() {
  this.registerForm = this.registerFormBuilder.group({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
    password: new FormControl<any>('', [Validators.required]),
    avatar: new FormControl<string>('', [Validators.required])
  })
}
get registerFormControls(){
return this.registerForm.controls
}

loadFile(event: any){
  this.loading = true;
  const reader = new FileReader();
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
 
      this.imageSrc = reader.result as string;
   const imageFormData = new FormData();
   imageFormData.append('file', file, file.name);
   this.authService.uploadFile(imageFormData).subscribe((data:FileUploadResponse)=>{
    this.registerForm.patchValue({
      avatar: data.location
    });
    this.loading = false;
  }, (error: ErrorType)=>{
    this.error = error
    this.loading = false;
  }); 
    };

  }
}
onSubmit(){
  this.loading = true;
this.authService.registerUser(this.registerForm.value).subscribe((data: RegisterResponse)=>{
  this.loading = false;
  this.router.navigate(['/login']);
}, (error: ErrorType)=>{
  this.error = error
  this.loading = false;
})
}
}
