import { SalesItem } from './sales-item';

export class SaveSales {
    CustomerId: number;
    TotalAmount: number;
    IsPaid: boolean;
    SalesItem: SalesItem[];
}