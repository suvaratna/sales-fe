import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { ProductComponent } from './modules/components/product/product.component';
import { CustomerComponent } from './modules/components/customer/customer.component';
import { ProductCreateComponent } from './modules/components/product/product-create/product-create.component';
import { SalesCreateComponent } from './modules/components/dashboard/sales-create/sales-create.component';
import { SalesEditComponent } from './modules/components/dashboard/sales-edit/sales-edit.component';
import { InvoiceComponent } from './modules/components/dashboard/invoice/invoice.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { Role } from './shared/models/Role';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductComponent, canActivate: [AuthGuard]  },
      { path: 'customers', component: CustomerComponent, canActivate: [AuthGuard]  },
      { path: 'sales-create', component: SalesCreateComponent, canActivate: [AuthGuard]  },
      { path: 'sales-edit/:id', component: SalesEditComponent, canActivate: [AuthGuard] },
      { path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthGuard] }
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  { path: 'access-denied', component: AccessDeniedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
