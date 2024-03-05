
class ProductRequestDTO {
    store_id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    media_urls: string[];

    constructor(
        store_id: string,
        category_id: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        media_urls: string[]) {
        this.store_id = store_id;
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.media_urls = media_urls;
    }

};

export default ProductRequestDTO;


