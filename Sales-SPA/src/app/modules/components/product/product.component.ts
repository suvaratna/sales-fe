import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../models/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductCreateComponent } from './product-create/product-create.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  searchKey: string;
  listProduct: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Name', 'Rate', 'Actions'];

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService) {
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    return this.productService.GetAllProducts()
      .subscribe(res => {
        this.listProduct = new MatTableDataSource(res);
        this.listProduct.sort = this.sort;
        this.listProduct.paginator = this.paginator;
      });
  }

  onCreate() {
    this.productService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductCreateComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
     this.listProduct.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row: Product) {
    this.productService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductCreateComponent, dialogConfig);
  }

  onDelete(row: Product) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.productService.DeleteProduct(row.Id)
         .subscribe(() => {
          this.notificationService.warn('! Deleted successfully');
          this.ngOnInit();
         });
      }
    });
  }


}
