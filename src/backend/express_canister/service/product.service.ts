import { Request } from "express";
import { categoryStorage, mediaStorage, productStorage, usersStorage } from "../db/data";
import ProductRequestDTO from "../dto/request/product.create.dto";
import Media from "../model/media";
import Product from "../model/product";
import generateId from "../utils/util";
import { getCategoryName } from "./category.service";
import ProductResponseDTO from "../dto/response/product.dto";

export function createProduct(req: Request<any, any, any>, res: any) {

    const store_id = (req as any).user.id;
    const payload: ProductRequestDTO = req.body;


    const requiredFields = ['category_id', 'name', 'description', 'price', 'stock', 'image_url'];
    const missingFields = requiredFields.filter(field => !payload.hasOwnProperty(field));

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    let id = "";

    const category_name = getCategoryName(payload.category_id);
    if (category_name === "") {
        return res.status(400).json("Invalid category id");
    }

    while (true) {
        id = generateId();
        const checkProductOpt = productStorage.get(id);
        if ("None" in checkProductOpt) {
            break;
        }
    }

    const product: Product = {
        id: id,
        store_id: store_id,
        category_id: payload.category_id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        stock: payload.stock,
        image_url: payload.image_url
    };

    productStorage.insert(product.id, product);

    const response: ProductResponseDTO = {
        id: product.id,
        store_id: product.store_id,
        category_name: category_name,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url
    }

    return res.json(response);
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

export function updateProduct(req: Request<any, any, any>, res: any) {
    const store_id = (req as any).user.id;
    const product_id = req.params.id;

    const productOpt = productStorage.get(product_id);

    if ("None" in productOpt) {
        return res.status(400).json("Product does not exist");
    }

    if (store_id !== productOpt.Some.store_id) {
        return res.status(400).json("Unauthorized");
    }

    const newProduct: Product = req.body;

    const requiredFields = [
        'id',
        'store_id',
        'category_id',
        'name',
        'description',
        'price',
        'stock',
        'image_url'
    ];

    const missingFields = requiredFields.filter(field => !newProduct.hasOwnProperty(field));

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }


    productStorage.insert(product_id, newProduct);
    return res.json(newProduct);
}

export function getAllProduct(req: Request<any, any, any>, res: any) {
    let products: ProductResponseDTO[] = [];

    productStorage.values().forEach((product: Product) => {
        const category_name = getCategoryName(product.category_id);
        const productResponse: ProductResponseDTO = {
            id: product.id,
            store_id: product.store_id,
            category_name: category_name,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image_url: product.image_url
        }

        products.push(productResponse);
    })

    return res.json(products);
}

export function getProductByStore(req: Request<any, any, any>, res: any) {
    const store_id = req.params.id;
    const storeOpt = usersStorage.get(store_id)

    if ("None" in storeOpt) {
        return res.status(400).json("Store does not exist");
    }

    let products: ProductResponseDTO[] = [];

    productStorage.values().forEach((product: Product) => {
        if (product.store_id === store_id) {
            const category_name = getCategoryName(product.category_id);

            const productResponse: ProductResponseDTO = {
                id: product.id,
                store_id: product.store_id,
                category_name: category_name,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image_url: product.image_url
            }

            products.push(productResponse);
        }
    })

    return res.json(products);
}

export function getProductById(req: Request<any, any, any>, res: any) {
    const product_id = req.params.id

    const productOpt = productStorage.get(product_id)

    if ("None" in productOpt) {
        return res.status(400).json("Product does not exist");
    }

    const category_name = getCategoryName(productOpt.Some.category_id);

    const response: ProductResponseDTO = {
        id: productOpt.Some.id,
        store_id: productOpt.Some.store_id,
        category_name: category_name,
        name: productOpt.Some.name,
        description: productOpt.Some.description,
        price: productOpt.Some.price,
        stock: productOpt.Some.stock,
        image_url: productOpt.Some.image_url
    }

    return res.json(response);
}

export function getProductByName(req: Request<any, any, any>, res: any) {
    const name = req.query.name ? req.query.name : "";

    let products: ProductResponseDTO[] = [];

    for (const product of productStorage.values()) {

        if (product.name.toLowerCase().includes((name as string).toLowerCase())) {
            const category_name = getCategoryName(product.category_id);

            const productResponse: ProductResponseDTO = {
                id: product.id,
                store_id: product.store_id,
                category_name: category_name,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image_url: product.image_url
            }

            products.push(productResponse);
        }


    }

    return res.json(products);
}