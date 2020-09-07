import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/modules/services/invoice.service';
import { InvoiceItem } from 'src/app/modules/models/invoice-item';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceItems: InvoiceItem[] = [];
  listItems: MatTableDataSource<InvoiceItem>;
  displayedColumns: string[] = ['Product', 'Quantity', 'Rate', 'Amount'];


  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      if (param && param.id) {
        this.invoiceService.GetInvoiceItemsById(Number(param.id))
          .subscribe(x => {
            this.invoiceItems = x;
            this.listItems = new MatTableDataSource(this.invoiceItems);
          });
      }
    });
  }

}
