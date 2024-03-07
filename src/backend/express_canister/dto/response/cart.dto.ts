import ProductResponseDTO from "./product.dto";

class CartResponseDTO {
    product_id: string;
    quantity: number;
    product: ProductResponseDTO
    constructor(product_id: string, quantity: number, product: ProductResponseDTO) {
        this.product_id = product_id;
        this.quantity = quantity;
        this.product = product;
    }

}


export default CartResponseDTO;