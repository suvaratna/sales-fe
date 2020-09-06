import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from 'src/app/modules/components/product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomerComponent } from 'src/app/modules/components/customer/customer.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCreateComponent } from 'src/app/modules/components/product/product-create/product-create.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerCreateComponent } from 'src/app/modules/components/customer/customer-create/customer-create.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProductComponent,
    CustomerComponent,
    ProductCreateComponent,
    CustomerCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    FormBuilder
  ]
})
export class DefaultModule { }
