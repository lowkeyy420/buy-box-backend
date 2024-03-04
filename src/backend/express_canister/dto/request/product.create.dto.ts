
class ProductRequestDTO {
    category_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    media_urls: string[];

    constructor(
        category_id: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        media_urls: string[]) {
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.media_urls = media_urls;
    }

};

export default ProductRequestDTO;


