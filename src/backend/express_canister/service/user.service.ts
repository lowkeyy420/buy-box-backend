import { Result, query, text, update, nat64, Opt, Ok, Err, Variant } from "azle";
import UserCreateRequestDTO from "../dto/request/user.create.dto";
import User from "../model/user";
import { usersStorage } from "../db/data";
import generateId from "../utils/util";

const Error = Variant({
  UserDoesNotExist: text,
  ShoppingListDoesNotExist: text,
});
export type Error = typeof Error.tsType;

export const createUser = update(
  [UserCreateRequestDTO],
  User,
  async (dto: UserCreateRequestDTO) => {
    const user: User = {
      id: usersStorage.len(),
      secure_id: generateId(),
      username: dto.username,
      email: dto.email,
      full_name: dto.full_name,
      password: dto.password,
      is_seller: false  
    };
    usersStorage.insert(user.id, user);

    return user;
  }
);

export const findByEmail = query(
  [text],
  Result(User, Error),
  async (email) => {

    console.log("masuk find by email, email: ", email);

    for (let num = BigInt(0); num < usersStorage.len(); num++) {
      const optUser: Opt<User> = usersStorage.get(num);
      if (optUser.Some?.email === email) {
        return Ok(optUser.Some);
      }
    }
    
    return Err({
      UserDoesNotExist: email
    });
  }
);