import { Request, Response } from 'express';
import Cart from '../model/cart';
import { cartStorage, productStorage } from '../db/data';
import CartResponseDTO from '../dto/response/cart.dto';
import Product from '../model/product';
import { getCategoryName } from './category.service';
import ProductResponseDTO from '../dto/response/product.dto';
import CartCreateRequestDTO from '../dto/request/cart.create.dto';

export function addCart(req: Request<any, any, any>, res: Response) {
    const request: CartCreateRequestDTO = req.body;
    const requiredFields = ["product_id", "quantity"];
    const missingFields = requiredFields.filter(field => !request.hasOwnProperty(field));

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const productRequestOpt = productStorage.get(request.product_id);
    if ("None" in productRequestOpt) {
        return res.status(400).json("Invalid product id");
    }

    if (request.quantity > productRequestOpt.Some.stock || request.quantity <= 0) {
        return res.status(400).json("Invalid quantity");
    }

    const userId = (req as any).user.id;
    const cartOpt = cartStorage.get(userId);

    const cartToAdd: Cart = {
        product_id: request.product_id,
        store_id: productRequestOpt.Some.store_id,
        quantity: request.quantity
    }

    if ("None" in cartOpt) {
        cartStorage.insert(userId, [cartToAdd]);
        return sendProductResponse(res, productRequestOpt.Some, request.quantity);
    }

    const newCart = cartOpt.Some;
    for (const item of newCart) {
        if (item.product_id === request.product_id) {
            if (item.quantity + request.quantity > productRequestOpt.Some.stock) {
                return res.status(400).json("Not enough stock");
            }
            item.quantity += request.quantity;
            cartStorage.insert(userId, newCart);
            return sendProductResponse(res, productRequestOpt.Some, item.quantity);
        }
    }

    newCart.push(cartToAdd);
    cartStorage.insert(userId, newCart);
    return sendProductResponse(res, productRequestOpt.Some, request.quantity);
}

function sendProductResponse(res: Response, product: Product, quantity: number) {

    const categoryName = getCategoryName(product.category_id);
    const productResponse: ProductResponseDTO = buildProductResponseDTO(product, categoryName);

    return res.json([{ product_id: product.id, quantity: quantity, product: productResponse }]);
}

function buildProductResponseDTO(product: Product, categoryName: string): ProductResponseDTO {
    return {
        id: product.id,
        store_id: product.store_id,
        category_name: categoryName,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url
    };
}



export function getCart(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;

    const cartOpt = cartStorage.get(user_id);

    if ("None" in cartOpt) {
        return res.json([]);
    }

    const cart = cartOpt.Some;
    const cartResponses: CartResponseDTO[] = cart.map(item => buildCartResponseDTO(item));

    return res.json(cartResponses);
}

function buildCartResponseDTO(item: Cart): CartResponseDTO {
    const productOpt = productStorage.get(item.product_id);
    if ("None" in productOpt) {
        throw new Error("Invalid product id");
    }

    const product = productOpt.Some;
    const categoryName = getCategoryName(product.category_id);
    const productResponse: ProductResponseDTO = buildProductResponseDTO(product, categoryName);

    return { product_id: item.product_id, quantity: item.quantity, product: productResponse };
}

export function deleteCart(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;
    const payload: Cart = req.body;

    const cartOpt = cartStorage.get(user_id);

    if ("None" in cartOpt) {
        return res.json([]);
    }

    const cart: Cart[] = cartOpt.Some;

    let response: CartResponseDTO

    for (const item of cart) {
        if (item.product_id === payload.product_id) {
            cart.splice(cart.indexOf(item), 1);
        }
    }

    cartStorage.insert(user_id, cart);
    return res.status(204).json();
}