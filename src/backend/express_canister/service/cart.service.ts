import { Request } from "express";
import Cart from "../model/cart";
import { cartStorage } from "../db/data";

export function addCart(req: Request<any, any, any>, res: any) {

    const request: Cart = req.body;
    const requiredFields = ["product_id", "quantity"];
    const missingFields = requiredFields.filter(field => !request.hasOwnProperty(field));

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const user_id = (req as any).user.id;

    const cartOpt = cartStorage.get(user_id);



    if ("None" in cartOpt) {
        cartStorage.insert(user_id, [request]);
        return res.json([request]);
    }

    const newCart = cartOpt.Some

    newCart.push(request);

    cartStorage.insert(user_id, newCart);
    return res.json(newCart);
}

export function getCart(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;

    const cartOpt = cartStorage.get(user_id);

    if ("None" in cartOpt) {
        return res.json([]);
    }

    const response: Cart[] = cartOpt.Some;
    return res.json(response);
}