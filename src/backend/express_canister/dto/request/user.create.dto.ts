import { Record, text } from "azle";

const UserCreateRequestDTO = Record({
  username: text,
  email: text,
  full_name: text,
  password: text
});

type UserCreateRequestDTO = typeof UserCreateRequestDTO.tsType;
export default UserCreateRequestDTO;