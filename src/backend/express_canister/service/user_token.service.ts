import { Request } from "express";
import { tokenStorage, usersStorage } from "../db/data";

export function authenticateToken(req: Request<any, any, any>, res: any) {
    const tokenRequest = req.headers.authorization?.split(" ")[1];

    if (!tokenRequest) {
        return res.status(401).send("no token");
    }

    const tokenOpt = tokenStorage.get(tokenRequest);

    if ("None" in tokenOpt) {
        return res.status(401).send("token not in storage");
    }

    if (tokenOpt.Some.expiration < Date.now() / 1000) {
        tokenStorage.remove(tokenRequest);
        return res.status(401).send("token expired");
    }

    const userOpt = usersStorage.get(tokenOpt.Some.user_id);
    if ("None" in userOpt) {
        return res.status(500).send("user_id is invalid");
    }

    return res.json({
        token: tokenOpt.Some,
        user: { ...userOpt.Some },
    });
}