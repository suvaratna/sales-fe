import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { CustomerCreateComponent } from './customer-create/customer-create.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  searchKey: string;
  listCustomer: MatTableDataSource<Customer>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Firstname', 'Lastname', 'Address', 'PhoneNumber', 'Actions'];

  constructor(private customerService: CustomerService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService) {
   }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    return this.customerService.GetAllCustomers()
      .subscribe(res => {
        this.listCustomer = new MatTableDataSource(res);
        this.listCustomer.sort = this.sort;
        this.listCustomer.paginator = this.paginator;
      });
  }

  onCreate() {
    this.customerService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomerCreateComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
     this.listCustomer.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row: Customer) {
    this.customerService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CustomerCreateComponent, dialogConfig);
  }

  onDelete(row: Customer) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.customerService.DeleteCustomer(row.Id)
         .subscribe(() => {
          this.notificationService.warn('! Deleted successfully');
          this.ngOnInit();
         });
      }
    });
  }

}
