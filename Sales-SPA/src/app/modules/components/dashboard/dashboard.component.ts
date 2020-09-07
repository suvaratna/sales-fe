import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Sales } from '../../models/sales';
import { SalesService } from '../../services/sales.service';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { SaveInvoice } from '../../models/save-invoice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchKey: string;
  saveInvoice: SaveInvoice = new SaveInvoice();
  listSales: MatTableDataSource<Sales>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['CustomerName', 'TotalAmount', 'IsPaid', 'Actions'];

  constructor(private salesService: SalesService,
              private router: Router,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private invoiceService: InvoiceService) {
   }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    return this.salesService.GetAllSales()
      .subscribe(res => {
        this.listSales = new MatTableDataSource(res);
        this.listSales.sort = this.sort;
        this.listSales.paginator = this.paginator;
      });
  }

  onCreate() {
    this.router.navigate(['/sales-create']);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
     this.listSales.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row: Sales) {
    // this.productService.populateForm(row);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '60%';
    // this.dialog.open(ProductCreateComponent, dialogConfig);
  }

  onDelete(row: Sales) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.salesService.DeleteSales(row.Id)
         .subscribe(() => {
          this.notificationService.warn('! Deleted successfully');
          this.ngOnInit();
         });
      }
    });
  }

  onPayment(row: Sales) {
    this.dialogService.openConfirmDialog('Are you sure to make payment ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.saveInvoice.SalesId = row.Id;
        this.invoiceService.SaveSales(this.saveInvoice)
         .subscribe(() => {
          this.notificationService.success('! Bill Generated Successfully');
          this.ngOnInit();
         });
      }
    });
  }

}
