import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorType } from 'types';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{
  loading:boolean = false;
  error: ErrorType = {
    statusCode: '',
    message: ''
  }
  onLoadingChange(loadingValue: boolean){
    this.loading = loadingValue
  }
  onErrorChange(errorValue: ErrorType){
    this.error = errorValue
  }
}
