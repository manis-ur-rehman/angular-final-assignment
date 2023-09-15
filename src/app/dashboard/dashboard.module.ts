import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductsComponent } from './products/products.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailsComponent } from './details/details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    LayoutComponent,
    SidebarComponent,
    DetailsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],

})
export class DashboardModule { }
