import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductionService } from 'src/app/production.service';
import { ErrorType } from 'types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  error: ErrorType = {
    message: '',
    statusCode: ''
  }
  allProductList:any = [];
  offset:number=0;
  limit:number=10
productionService: ProductionService = inject(ProductionService);

constructor(private router: Router){

}

ngOnInit(){
  this.loading = true;
this.productionService.getAllProducts(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res;
  this.loading = false;
}, (error: ErrorType)=>{
  this.error = error;
  this.loading = false;
});
}
getProductDataPrevious(offsetNumber: number){
  this.offset = --offsetNumber;
  this.loading = true;
  this.productionService.getProductByPagination(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res
  this.loading = false;
  }, (error: ErrorType)=>{
    this.error = error;
  this.loading = false;
  })
}

getProductDataNext(offsetNumber: number){
  this.offset = ++offsetNumber;
  this.loading = true;
  this.productionService.getProductByPagination(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res
  this.loading = false;
  }, (error: ErrorType)=>{
    this.error = error;
  this.loading = false;
  })
}

getProductDataByList(offsetNumber: number){
  this.offset = offsetNumber;
  this.loading = true;
  this.productionService.getProductByPagination(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res;
  this.loading = false;
  }, (error: ErrorType)=>{
    this.error = error;
  this.loading = false;
  })
}

navigateDetailsRoute(id: number){
  this.router.navigate(['dashboard/details', id])
}
navigateEditRoute(id: number){
  this.router.navigate(['dashboard/edit-product', id])
}
navigateToAddProduct(){
  this.router.navigate(['dashboard/add-product'])
}
}
