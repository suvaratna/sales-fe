import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from 'src/app/modules/components/product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class DefaultModule { }
