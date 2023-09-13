import { Component, inject, OnInit } from '@angular/core';
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

ngOnInit(){
this.productionService.getAllProducts(this.offset, this.limit).subscribe(res=>{
  this.allProductList = res
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
}
