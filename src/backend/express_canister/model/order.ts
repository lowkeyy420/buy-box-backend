export class Order {
    id: string;
    store_id: string;
    buyer_id: string;
    product_id: string;
    order_date: number;
    quantity: number
    status: string;

    constructor(id: string, store_id: string, buyer_id: string, product_id: string, order_date: number, quantity: number, status: string) {
        this.id = id;
        this.store_id = store_id;
        this.buyer_id = buyer_id;
        this.product_id = product_id;
        this.order_date = order_date;
        this.quantity = quantity;
        this.status = status;
    }
}

