import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SaveInvoice } from '../models/save-invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiService: ApiService) { }

   // Save a new invoice
   SaveSales(invoice: SaveInvoice) {
    return this.apiService.post('api/invoices', invoice);
  }

  // Get invoice items by Id
  GetInvoiceItemsById(id: number) {
    return this.apiService.get(`api/invoices/${id}`);
  }
}
