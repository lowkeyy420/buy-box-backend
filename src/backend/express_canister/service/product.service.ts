import { Request } from "express";
import { categoryStorage, mediaStorage, productStorage } from "../db/data";
import ProductRequestDTO from "../dto/request/product.create.dto";
import Media from "../model/media";
import Product from "../model/product";
import generateId from "../utils/util";
import { createMedia } from "./media.service";

export function createProduct(req: Request<any, any, any>, res: any) {

    const store_id = (req as any).user.id;
    const payload: ProductRequestDTO = req.body;

    let id = "";

    const checkCategoryOpt = categoryStorage.get(payload.category_id);
    if ("None" in checkCategoryOpt) {
        return res.status(400).json("Category does not exist");
    }

    while (true) {
        id = generateId();
        const checkProductOpt = productStorage.get(id);
        if ("None" in checkProductOpt) {
            break;
        }
    }

    let medias: Media[] = []

    payload.media_urls.forEach((media_url: string) => {
        const media = createMedia(id, media_url)
        if (media) {
            medias.push(media);
        }
    })



    const product: Product = {
        id: id,
        store_id: store_id,
        category_id: payload.category_id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        stock: payload.stock,
        medias: medias
    };

    productStorage.insert(product.id, product);
    return res.json(product);
}

export function removeProduct(req: Request<any, any, any>, res: any) {
    const store_id = (req as any).user.id;
    const product_id = req.params.id;

    const productOpt = productStorage.get(product_id);
    if ("None" in productOpt) {
        return res.status(400).json("No such product");
    }

    const product: Product = productOpt.Some;

    if (store_id !== product.store_id) {
        return res.status(400).json("Unauthorized");
    }

    productStorage.remove(product_id);
    return res.json(product);
}