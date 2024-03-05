import { Request } from "express";
import User from "../model/user";
import { usersStorage } from "../db/data";

export function createStore(req: Request<any, any, any>, res: any) {
    const user: User = (req as any).user;

    if (user.is_store === true) {
        return res.status(500).send("Store already registered");
    }

    const updatedUser: User = {
        ...user,
        is_store: true
    }

    usersStorage.insert(user.id, updatedUser);
    return res.json(updatedUser);
}