import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductService } from 'src/app/modules/services/product.service';
import { Product } from 'src/app/modules/models/product';
import { SalesItem } from 'src/app/modules/models/sales-item';
import { Router } from '@angular/router';
import { SaveSales } from 'src/app/modules/models/save-sales';
import { CustomerService } from 'src/app/modules/services/customer.service';
import { Customer } from 'src/app/modules/models/customer';
import { SalesService } from 'src/app/modules/services/sales.service';


@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css']
})
export class SalesCreateComponent implements OnInit {

  selectedCustomerId: number;
  customerList: Customer[];
  ItemList: SalesItem[] = [];
  TableItemList: MatTableDataSource<SalesItem>;
  productList: Product[] = [];
  displayedColumns: string[] = ['Name', 'Inc', 'Quantity', 'Rate', 'Amount', 'Actions'];
  saveSales: SaveSales;

  constructor(private productService: ProductService,
              private router: Router,
              private customerService: CustomerService,
              private salesService: SalesService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.GetCustomersWithoutSales()
      .subscribe(res => {
        this.customerList = res;
      });
  }

  getProducts() {
    this.productService.GetAllProducts()
      .subscribe(res => {
        this.productList = res;
      });
    this.TableItemList = new MatTableDataSource(this.ItemList);
  }


  onClick(product: Product) {
    const newItem = new SalesItem(product.Id, product.Name, product.Rate);
    this.AddItem(newItem);
  }

  AddItem(newItem: SalesItem) {
    const itemIndex = this.ItemList.findIndex(res => res.ProductId === newItem.ProductId);
    if (itemIndex === -1) {
      this.ItemList.push(newItem);
    } else {
      this.ItemList[itemIndex].Quantity ++;
      this.calAmount(itemIndex);
    }
    this.renderTable();
  }

  calAmount(index: number) {
    this.ItemList[index].Amount = this.ItemList[index].Quantity * this.ItemList[index].Rate;
  }

  renderTable() {
    this.TableItemList = new MatTableDataSource(this.ItemList);
  }

  onDelete(row: SalesItem) {
    const index = this.ItemList.findIndex(res => res.ProductId === row.ProductId);
    this.ItemList.splice(index, 1);
    this.renderTable();
  }

  onRemove(row: SalesItem) {
    const index = this.ItemList.findIndex(res => res.ProductId === row.ProductId);
    if (row.Quantity === 1) {
      this.ItemList.splice(index, 1);
    } else {
      this.ItemList[index].Quantity --;
      this.calAmount(index);
    }
    this.renderTable();
  }

  onBack() {
    this.router.navigate(['/']);
  }

  getTotalAmount() {
    return this.ItemList.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
  }

  onCustomerSelected(customer: Customer) {
    this.selectedCustomerId = customer.Id;
  }

  onCreate() {
    const sales: SaveSales = {
      CustomerId: this.selectedCustomerId,
      TotalAmount: this.getTotalAmount(),
      IsPaid: false,
      SalesItem: this.ItemList
    };

    if (sales.CustomerId === undefined) {
      this.notification.warn('Please select customer');
      return;
    }

    if (!sales.SalesItem || !sales.SalesItem.length) {
      this.notification.warn('Please select at least one product');
      return;
    }

    this.salesService.SaveSales(sales)
      .subscribe(res => {
        this.notification.success(':: Added successfully');
        this.router.navigate(['/']);
      });
  }

}
