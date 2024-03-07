import { Principal, StableBTreeMap } from "azle";
import User from "../model/user";
import UserToken from "../model/user_token";
import Product from "../model/product";
import Category from "../model/category";
import Cart from "../model/cart";
import { Order } from "../model/order";

const STORAGE_MEMORY_ID = {
    "USER": 1,
    "USER_AUTH": 2,
    "CATEGORY": 3,
    "PRODUCT": 4,
    "CART": 5,
    "ORDER": 6,
};

export const usersStorage = StableBTreeMap<string, User>(STORAGE_MEMORY_ID["USER"]);
export const tokenStorage = StableBTreeMap<string, UserToken>(STORAGE_MEMORY_ID["USER_AUTH"]);

export const categoryStorage = StableBTreeMap<string, Category>(STORAGE_MEMORY_ID["CATEGORY"]);

export const productStorage = StableBTreeMap<string, Product>(STORAGE_MEMORY_ID["PRODUCT"]);

export const cartStorage = StableBTreeMap<string, Cart[]>(STORAGE_MEMORY_ID["CART"]);

export const orderStorage = StableBTreeMap<string, Order>(STORAGE_MEMORY_ID["ORDER"]);




