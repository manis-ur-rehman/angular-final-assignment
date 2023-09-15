import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorType } from 'types';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  loading:boolean = false;
  error: ErrorType = {
    statusCode: '',
    message: ''
  }
  addProductForm!:FormGroup;
  constructor(public addProductFormBuilder:FormBuilder, private router:Router){
  }

ngOnInit() {
  this.addProductForm = this.addProductFormBuilder.group({
    name: new FormControl<string>('', [Validators.required])
  })
}

  onSubmit(){

  }

}
