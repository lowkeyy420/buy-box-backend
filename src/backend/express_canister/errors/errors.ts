import { Variant, text } from "azle";

const CustomError = Variant({
  UserDoesNotExist: text,
  ShoppingListDoesNotExist: text,
});

export type CustomError = typeof CustomError.tsType;