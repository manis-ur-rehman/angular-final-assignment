import { Component } from '@angular/core';
import { ErrorType } from 'types';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
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
