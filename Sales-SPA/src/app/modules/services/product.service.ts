import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Product } from '../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  form: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Name: new FormControl('', Validators.required),
    Rate: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      Id: null,
      Name: '',
      Rate: '',
    });
  }

  populateForm(product: Product) {
    this.form.setValue(product);
  }

  constructor(private apiService: ApiService) { }

  // get all products
  GetAllProducts() {
    return this.apiService.get(`api/products`);
  }

   // Save a new product
   SaveProduct(product: Product) {
    return this.apiService.post('api/products', product);
  }

    //  Update an existing Product
    UpdateProduct(id: number, product: Product) {
    return this.apiService.put(`api/products/${id}`, product);
  }

  // Delete Product by Id
  DeleteProduct(id: number) {
    return this.apiService.delete(`api/products/${id}`);
  }

}
