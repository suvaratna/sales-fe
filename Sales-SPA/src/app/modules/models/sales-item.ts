import { ThrowStmt } from '@angular/compiler';

export class SalesItem {
    constructor(Id: number, Name: string, Rate: number) {
        this.Id = 0;
        this.SalesId = 0;
        this.ProductId = Id;
        this.Name = Name;
        this.Quantity = 1;
        this.Rate = Rate;
        this.Amount = this.Rate * this.Quantity;
    }
    Id: number;
    SalesId: number;
    ProductId: number;
    Quantity: number;
    Rate: number;
    Amount: number;
    Name: string;
}
