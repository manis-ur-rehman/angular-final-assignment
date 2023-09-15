import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionService } from 'src/app/production.service';
import { ErrorType, getProductResponse } from 'types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
productItem:getProductResponse = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  images: [],
  creationAt: "",
  updatedAt: "",
  category: {
      id: 0,
      name: "",
      image: "",
      creationAt: "",
      updatedAt: ""
  }
}; 
  loading:boolean = false;
  error: ErrorType = {
    statusCode: '',
    message: ''
  }
  id: string | null = '';

productionService: ProductionService = inject(ProductionService);

  constructor(private _Activatedroute:ActivatedRoute, private location: Location){
  }

  ngOnInit(){
    this.id= this._Activatedroute.snapshot.paramMap.get("id");
    if(this.id){
      this.loading = true;
      this.productionService.getProductById(Number(this.id)).subscribe((productItem: getProductResponse)=>{
        this.loading = false;
        this.productItem = productItem;
      }, (error: ErrorType)=>{
        this.error = error
        this.loading = false;
      })
    }
  }
  navigateToBack(){
this.location.back();
  }
}
