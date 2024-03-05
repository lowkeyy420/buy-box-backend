import Media from "../../model/media";


class ProductResponseDTO {
    id: string;
    store_id: string;
    category_name: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    medias: Media[];

    constructor(id: string,
        store_id: string,
        category_name: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        medias: Media[]) {
        this.id = id;
        this.store_id = store_id;
        this.category_name = category_name;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.medias = medias;
    }

};

export default ProductResponseDTO;
