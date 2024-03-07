class CartCreateRequestDTO {
    product_id: string;
    quantity: number;
    constructor(product_id: string,
        quantity: number) {
        this.product_id = product_id;
        this.quantity = quantity;
    }
}

export default CartCreateRequestDTO;