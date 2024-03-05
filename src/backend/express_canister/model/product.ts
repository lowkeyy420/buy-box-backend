import Media from "./media";

class Product {
    id: string;
    store_id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    medias: Media[];

    constructor(id: string,
        store_id: string,
        category_id: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        medias: Media[]) {
        this.id = id;
        this.store_id = store_id;
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.medias = medias;
    }

};

export default Product;
