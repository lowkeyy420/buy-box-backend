import { Request } from "express";
import { cartStorage, orderStorage, productStorage, usersStorage } from "../db/data";
import Cart from "../model/cart";
import generateId from "../utils/util";
import { Order } from "../model/order";
import User from "../model/user";
import { OrderResponseDTO } from "../dto/response/order.dto";

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
    const user = (req as any).user;

    const store_id = req.params.id;

    const allOrders = orderStorage.values();

    let response: OrderResponseDTO[] = [];
    for (const order of allOrders) {
        if (order.store_id === store_id) {
            const productOpt = productStorage.get(order.product_id);
            if ("None" in productOpt) {
                continue;
            }

            const storeOpt = usersStorage.get(order.store_id);
            if ("None" in storeOpt) {
                continue;
            }

            const orderDTO: OrderResponseDTO = {
                id: order.id,
                store_name: storeOpt.Some.username,
                buyer_name: user.full_name,
                buyer_id: order.buyer_id,
                product: productOpt.Some,
                order_date: order.order_date,
                quantity: order.quantity,
                status: order.status
            }
            response.push(orderDTO);
        }
    }

    return res.json(response);
}

export function getUserOrder(req: Request<any, any, any>, res: any) {
    const user: User = (req as any).user;

    const allOrders = orderStorage.values();

    let response: OrderResponseDTO[] = [];
    for (const order of allOrders) {
        if (order.buyer_id === user.id) {
            const productOpt = productStorage.get(order.product_id);
            if ("None" in productOpt) {
                continue;
            }

            const storeOpt = usersStorage.get(order.store_id);
            if ("None" in storeOpt) {
                continue;
            }
            const orderDTO: OrderResponseDTO = {
                id: order.id,
                store_name: storeOpt.Some.username,
                buyer_name: user.full_name,
                buyer_id: order.buyer_id,
                product: productOpt.Some,
                order_date: order.order_date,
                quantity: order.quantity,
                status: order.status
            }
            response.push(orderDTO);
        }
    }
    return res.json(response);
}

// Seller Only
export function getOrderByBuyerID(req: Request<any, any, any>, res: any) {
    const user: User = (req as any).user;

    const buyer_id = req.query.buyer;

    if (user.is_store === false) {
        res.status(401).send("Unauthorized");
        return;
    }

    const allOrders = orderStorage.values();

    let response: OrderResponseDTO[] = [];
    for (const order of allOrders) {
        if (order.buyer_id === buyer_id && order.store_id === user.id) {
            const productOpt = productStorage.get(order.product_id);
            if ("None" in productOpt) {
                continue;
            }

            const buyerOpt = usersStorage.get(order.buyer_id);
            if ("None" in buyerOpt) {
                continue;
            }

            const orderDTO: OrderResponseDTO = {
                id: order.id,
                store_name: user.username,
                buyer_name: buyerOpt.Some.full_name,
                buyer_id: order.buyer_id,
                product: productOpt.Some,
                order_date: order.order_date,
                quantity: order.quantity,
                status: order.status
            }
            response.push(orderDTO);
        }
    }
    return res.json(response);
}

export function updateOrderStatus(req: Request<any, any, any>, res: any) {
    const user_id = (req as any).user.id;

    const order_id = req.body.order_id;
    const status = req.body.status;

    const orderOpt = orderStorage.get(order_id);

    if ("None" in orderOpt) {
        res.status(404).send("Order not found");
        return;
    }

    if (orderOpt.Some.store_id !== user_id) {
        res.status(401).send("Unauthorized");
        return;
    }

    const order = orderOpt.Some;

    const newOrder: Order = {
        id: order_id,
        store_id: order.store_id,
        buyer_id: order.buyer_id,
        product_id: order.product_id,
        order_date: order.order_date,
        quantity: order.quantity,
        status: status
    };

    orderStorage.insert(order_id, newOrder);

    res.status(200).send("Order updated");
}