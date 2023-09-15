import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductionService } from 'src/app/production.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProductList:any = [];
  offset:number=0;
  limit:number=10
productionService: ProductionService = inject(ProductionService);

constructor(private router: Router){

}

ngOnInit(){
this.productionService.getAllProducts(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res;
});
}
getProductDataPrevious(offsetNumber: number){
  this.offset = --offsetNumber;
  this.productionService.getProductByPagination(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res
  })
}

getProductDataNext(offsetNumber: number){
  this.offset = ++offsetNumber;
  this.productionService.getProductByPagination(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res
  })
}

getProductDataByList(offsetNumber: number){
  this.offset = offsetNumber;
  this.productionService.getProductByPagination(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res
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
