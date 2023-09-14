import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  imageSrc: string = '';
  registerForm!: FormGroup;
  authService: AuthService = inject(AuthService);

constructor(public registerFormBuilder: FormBuilder, private router: Router){}

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
  const reader = new FileReader();
    
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
 
      this.imageSrc = reader.result as string;
   console.log("imagesrc: ", this.imageSrc)
      this.registerForm.patchValue({
        avatar: reader.result as string
      });
 
    };
 
  }
}
onSubmit(){

}
}
