import { Principal, StableBTreeMap } from "azle";
import User from "../model/user";

const STORAGE_MEMORY_ID = {
    "USER": 1,
    "USER_AUTH": 2,
    "PRODUCT": 3
};

export let usersStorage = StableBTreeMap<string, User>(STORAGE_MEMORY_ID["USER"]);
// export let usersAuthStorage = StableBTreeMap<string, UserAuth>(STORAGE_MEMORY_ID["USER_AUTH"]);
// export let productStorage = StableBTreeMap<string, Product>(STORAGE_MEMORY_ID["PRODUCT"]);
