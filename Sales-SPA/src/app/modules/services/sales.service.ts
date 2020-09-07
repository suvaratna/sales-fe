import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SaveSales } from '../models/save-sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private apiService: ApiService) { }

  // get all sales
  GetAllSales() {
    return this.apiService.get(`api/sales`);
  }

   // Save a new sales
   SaveSales(saveSales: SaveSales) {
    return this.apiService.post('api/sales', saveSales);
  }

  // Get Sales Transaction by Id
  GetSalesById(id: number) {
    return this.apiService.get(`api/sales/${id}`);
  }

    //  Update an existing Product
    UpdateSales(id: number, sales: SaveSales) {
    return this.apiService.put(`api/sales/${id}`, sales);
  }

  // Delete Sales by Id
  DeleteSales(id: number) {
    return this.apiService.delete(`api/sales/${id}`);
  }

}
