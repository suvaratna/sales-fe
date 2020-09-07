import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/modules/models/customer';
import { CustomerService } from 'src/app/modules/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer;

  constructor(public customerService: CustomerService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<CustomerCreateComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.customerService.form.invalid) {
      return;
    }

    this.customer = this.customerService.form.value;
    this.customer.PhoneNumber = this.customer.PhoneNumber.toString();

    if (this.customer.Id === null) {
      // Add Product
      this.customerService.SaveCustomer(this.customer)
      .subscribe(() => {
        this.notificationService.success(':: Added successfully');
        this.customerService.form.reset();
        this.customerService.initializeFormGroup();
        this.onClose();
        location.reload();
      });
    } else {
      // Update Product
      this.customerService.UpdateCustomer(this.customer.Id, this.customer)
      .subscribe(() => {
        this.notificationService.success(':: Updated successfully');
        this.customerService.form.reset();
        this.customerService.initializeFormGroup();
        this.onClose();
        location.reload();
    });
    }
  }

  onClear() {
    this.customerService.form.reset();
    this.customerService.initializeFormGroup();
  }

  onClose() {
    this.customerService.form.reset();
    this.customerService.initializeFormGroup();
    this.dialogRef.close();
  }

}
