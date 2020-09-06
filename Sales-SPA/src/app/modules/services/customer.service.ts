import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  form: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Firstname: new FormControl('', Validators.required),
    Lastname: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      Id: null,
      Firstname: '',
      Lastname: '',
      Address: '',
      PhoneNumber: ''
    });
  }

  populateForm(customer: Customer) {
    this.form.setValue(customer);
  }

  constructor(private apiService: ApiService) { }

  // get all customers
  GetAllCustomers() {
    return this.apiService.get(`api/customers`);
  }

   // Save a new customer
  SaveCustomer(customer: Customer) {
    return this.apiService.post('api/customers', customer);
  }

    //  Update an existing customer
  UpdateCustomer(id: number, customer: Customer) {
    return this.apiService.put(`api/customers/${id}`, customer);
  }

  // Delete Customer by Id
  DeleteCustomer(id: number) {
    return this.apiService.delete(`api/customers/${id}`);
  }
}
