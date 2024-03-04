import { Principal, StableBTreeMap } from "azle";
import User from "../model/user";
import UserToken from "../model/user_token";
import Product from "../model/product";
import Media from "../model/media";
import Category from "../model/category";

const STORAGE_MEMORY_ID = {
    "USER": 1,
    "USER_AUTH": 2,
    "CATEGORY": 3,
    "MEDIA": 4,
    "PRODUCT": 5,
    "CART": 6,
    "ORDER": 7,
};

export const usersStorage = StableBTreeMap<string, User>(STORAGE_MEMORY_ID["USER"]);
export const tokenStorage = StableBTreeMap<string, UserToken>(STORAGE_MEMORY_ID["USER_AUTH"]);

export const categoryStorage = StableBTreeMap<string, Category>(STORAGE_MEMORY_ID["CATEGORY"]);

export const mediaStorage = StableBTreeMap<string, Media>(STORAGE_MEMORY_ID["MEDIA"]);
export const productStorage = StableBTreeMap<string, Product>(STORAGE_MEMORY_ID["PRODUCT"]);




