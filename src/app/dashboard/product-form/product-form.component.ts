import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionService } from 'src/app/production.service';
import { Category, ErrorType, ProductResponse, editProductRequest } from 'types';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoryList: Array<Category> = [];
  id: string | null = '';
  @Input() loading!: boolean;
  @Input() error!: ErrorType;
  @Input() isEdit!: boolean;
  @Output() loadingHandler:EventEmitter<boolean> = new EventEmitter();
  @Output() errorHandler:EventEmitter<ErrorType> = new EventEmitter();

productionService:ProductionService = inject(ProductionService);

  productForm!:FormGroup;
  constructor(public productFormBuilder:FormBuilder, private router:Router, private _Activatedroute:ActivatedRoute, private location: Location){
  }

ngOnInit() {
  this.id= this._Activatedroute.snapshot.paramMap.get("id");
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
  if(this.id && this.isEdit){
    this.productFormControls['description'].disable();
    this.productFormControls['categoryId'].disable();
    this.productionService.getProductById(Number(this.id)).subscribe((successData: ProductResponse)=>{
      this.productForm.patchValue({
        title: successData.title,
        price: successData.price,
        description: successData.description,
        categoryId: successData.category.id,
        images: successData.images,
      })
    }, (error: ErrorType)=>{
    })
  }
}

get productFormControls(){
  return this.productForm.controls;
}
  onSubmit(){
    this.errorHandler.emit({message: '', statusCode: ''});
this.loadingHandler.emit(true);
if(this.id && this.isEdit){
  let data:editProductRequest = {
    title: this.productFormControls['title'].value,
    price: this.productFormControls['price'].value,
    images: this.productFormControls['images'].value,
  }
  this.productionService.editProduct(data, Number(this.id)).subscribe((successData: ProductResponse)=>{
    this.location.back();
    this.loadingHandler.emit(false);
  }, (error: ErrorType)=>{
    this.errorHandler.emit(error);
  this.loadingHandler.emit(false);
  });  
}
else{
  this.productionService.addProduct(this.productForm.value).subscribe((successData: ProductResponse)=>{
    alert("Add SuccessFully");
    this.loadingHandler.emit(false);
  }, (error: ErrorType)=>{
    this.errorHandler.emit(error);
  this.loadingHandler.emit(false);
  });
}
  }
}
