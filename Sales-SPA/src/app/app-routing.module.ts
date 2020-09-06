import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { ProductComponent } from './modules/components/product/product.component';
import { CustomerComponent } from './modules/components/customer/customer.component';
import { ProductCreateComponent } from './modules/components/product/product-create/product-create.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'products/create', component: ProductCreateComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
