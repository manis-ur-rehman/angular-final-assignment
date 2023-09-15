import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductionService } from 'src/app/production.service';
import { Category, ErrorType, ProductResponse } from 'types';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoryList: Array<Category> = [];
  @Input() loading!: boolean;
  @Input() error!: ErrorType;
  @Output() loadingHandler:EventEmitter<boolean> = new EventEmitter();
  @Output() errorHandler:EventEmitter<ErrorType> = new EventEmitter();

productionService:ProductionService = inject(ProductionService);

  productForm!:FormGroup;
  constructor(public productFormBuilder:FormBuilder, private router:Router){
  }

ngOnInit() {
  this.productionService.categoryList().subscribe((successData: Array<Category>)=>{
    this.categoryList = successData;
  }, (error: ErrorType)=>{
  })
  this.productForm = this.productFormBuilder.group({
    title: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    images: new FormControl<Array<string>>(['https://placeimg.com/640/480/any'])
  })
}

get productFormControls(){
  return this.productForm.controls;
}
  onSubmit(){
    this.errorHandler.emit({message: '', statusCode: ''});
this.loadingHandler.emit(true);
this.productionService.addProduct(this.productForm.value).subscribe((successData: ProductResponse)=>{
  alert("Add SuccessFully");
  this.loadingHandler.emit(false);
}, (error: ErrorType)=>{
  this.errorHandler.emit(error);
this.loadingHandler.emit(false);
});
  }
}
