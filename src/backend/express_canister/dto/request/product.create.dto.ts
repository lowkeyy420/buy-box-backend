
class ProductRequestDTO {
    category_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string[];

    constructor(
        category_id: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        image_url: string[]) {
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image_url = image_url;
    }

};

export default ProductRequestDTO;


