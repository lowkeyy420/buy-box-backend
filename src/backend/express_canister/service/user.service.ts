import UserCreateRequestDTO from "../dto/request/user.create.dto";
import User from "../model/user";
import { tokenStorage, usersStorage } from "../db/data";
import generateId from "../utils/util";
import { Request } from "express";
import { compareSync, hashSync } from "bcryptjs";
import { generateToken } from "../utils/jwt";
import UserToken from "../model/user_token";
import UserCreateResponsetDTO from "../dto/response/user.create.dto";
import UserLoginRequestDTO from "../dto/request/user.login.dto";
import UserLoginResponsetDTO from "../dto/response/user.login.dto";


export function createUser(req: Request<UserCreateRequestDTO, any, any>, res: any) {
  const payload: UserCreateRequestDTO = req.body;

  for (const iterator of usersStorage.values()) {
    if (payload.email === iterator.email) {
      return res.status(400).send();
    }
  }

  const userID = generateId();
  const userOpt = usersStorage.get(userID);

  if ("None" in userOpt) {
    const password = hashSync(req.body.password, 8);

    const user: User =
    {
      id: userID,
      ...payload,
      password: password,
      is_store: false,
      balance: 0
    };

    usersStorage.insert(user.id, user);

    const generatedToken = generateToken({
      user_id: user.id,
      full_name: user.full_name,
      is_store: user.is_store
    }, 60);

    const token: UserToken = {
      token: generatedToken.token,
      user_id: user.id,
      expiration: generatedToken.expiration
    }

    tokenStorage.insert(token.token, token)

    const response: UserCreateResponsetDTO = {
      token: token.token,
      data: user.email
    }

    return res.json(response);
  }

  return res.status(400).send();
}

export function loginUser(req: Request<UserLoginRequestDTO, any, any>, res: any) {
  const payload: UserLoginRequestDTO = req.body;

  for (const iterator of usersStorage.values()) {
    if (payload.email === iterator.email && compareSync(payload.password, iterator.password)) {

      const generatedToken = generateToken({
        user_id: iterator.id,
        full_name: iterator.full_name,
        is_store: iterator.is_store
      }, 60);

      const token: UserToken = {
        token: generatedToken.token,
        user_id: iterator.id,
        expiration: generatedToken.expiration
      }

      tokenStorage.insert(token.token, token)

      const response: UserLoginResponsetDTO = {
        token: token.token,
      }

      return res.json(response);
    }
  }

  return res.status(400).send();
}