class Cart {
    product_id: string;
    store_id: string;
    quantity: number;
    constructor(product_id: string,
        store_id: string,
        quantity: number) {
        this.product_id = product_id;
        this.store_id = store_id;
        this.quantity = quantity;
    }
}

export default Cart;