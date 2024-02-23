import { Principal, Record, bool, nat64, text } from "azle";

const User = Record({
  id: nat64,
  secure_id: Principal,
  username: text,
  email: text,
  full_name: text,
  password: text,
  is_seller: bool
});

type User = typeof User.tsType;
export default User;