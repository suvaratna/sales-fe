import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/modules/services/product.service';
import { Product } from 'src/app/modules/models/product';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product;

  constructor(public productService: ProductService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ProductCreateComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.productService.form.invalid) {
      return;
    }

    this.product = this.productService.form.value;

    if (this.product.Id === null) {
      // Add Product
      this.productService.SaveProduct(this.product)
      .subscribe(() => {
        this.notificationService.success(':: Added successfully');
        this.productService.form.reset();
        this.productService.initializeFormGroup();
        this.onClose();
        location.reload();
      });
    } else {
      // Update Product
      this.productService.UpdateProduct(this.product.Id, this.product)
      .subscribe(() => {
        this.notificationService.success(':: Updated successfully');
        this.productService.form.reset();
        this.productService.initializeFormGroup();
        this.onClose();
        location.reload();
    });
    }
  }

  onClear() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
  }

  onClose() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
    this.dialogRef.close();
  }

}
