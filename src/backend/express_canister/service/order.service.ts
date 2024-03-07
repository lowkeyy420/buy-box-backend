import { Request } from "express";
import { cartStorage, orderStorage, productStorage } from "../db/data";
import Cart from "../model/cart";
import generateId from "../utils/util";
import { Order } from "../model/order";
import User from "../model/user";

export function createOrder(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;

    const cartOpt = cartStorage.get(user_id);

    if ("None" in cartOpt) {
        res.status(404).send("Nothing to order");
        return;
    }

    const cart: Cart[] = cartOpt.Some;


    for (const item of cart) {
        const order_id = generateId();
        const order_date = Date.now();
        const orderToAdd: Order = {
            id: order_id,
            store_id: item.store_id,
            buyer_id: user_id,
            product_id: item.product_id,
            order_date: order_date,
            quantity: item.quantity,
            status: "Pending",
        };

        orderStorage.insert(order_id, orderToAdd);
    }

    cartStorage.remove(user_id);
    res.status(201).send("Order created");
}

export function getOrderByStoreID(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;

    const store_id = req.params.id;

    const orders: Order[] = orderStorage.values().filter((order) => order.store_id === store_id && order.buyer_id === user_id);
    return res.json(orders);
}

export function getUserOrder(req: Request<any, any, any>, res: any) {
    const user: User = (req as any).user;
    const orders: Order[] = orderStorage.values().filter((order) => order.buyer_id === user.id);
    return res.json(orders);
}

// Seller Only
export function getOrderByBuyerID(req: Request<any, any, any>, res: any) {
    const user: User = (req as any).user;

    const buyer_id = req.query.buyer;

    if (user.is_store === false) {
        res.status(401).send("Unauthorized");
        return;
    }

    const orders: Order[] = orderStorage.values().filter((order) => order.store_id === user.id && order.buyer_id === buyer_id);
    return res.json(orders);
}

export function updateOrderStatus(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;

    const order_id = req.body.order_id;
    const status = req.body.status;

    const order = orderStorage.get(order_id);

    if ("None" in order) {
        res.status(404).send("Order not found");
        return;
    }

    if (order.Some.store_id !== user_id) {
        res.status(401).send("Unauthorized");
        return;
    }

    order.Some.status = status;
    orderStorage.insert(order_id, order.Some);

    res.status(200).send("Order updated");
}