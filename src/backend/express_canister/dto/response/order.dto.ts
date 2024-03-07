import Product from "../../model/product";

export class OrderResponseDTO {
    id: string;
    store_name: string;
    buyer_name: string;
    buyer_id: string;
    product: Product;
    order_date: number;
    quantity: number
    status: string;

    constructor(id: string, store_name: string, buyer_name: string, buyer_id: string, product: Product, order_date: number, quantity: number, status: string) {
        this.id = id;
        this.store_name = store_name;
        this.buyer_name = buyer_name;
        this.buyer_id = buyer_id;
        this.product = product;
        this.order_date = order_date;
        this.quantity = quantity;
        this.status = status;
    }
}

