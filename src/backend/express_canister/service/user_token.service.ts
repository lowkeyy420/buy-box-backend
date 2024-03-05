import { Request } from "express";
import { tokenStorage, usersStorage } from "../db/data";
import UserTokenResponseDTO from "../dto/response/user_token.authenticate.dto";

export function authenticateToken(req: Request<any, any, any>, res: any) {

    const response: UserTokenResponseDTO = {
        token: (req as any).token,
        user: { ...(req as any).user },
    }

    return res.json(response);
}