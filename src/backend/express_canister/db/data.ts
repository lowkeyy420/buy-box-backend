import { nat64, StableBTreeMap } from "azle";
import User from "../model/user";

const USERS_STORAGE_MEMORY_ID = 1;

export let usersStorage = StableBTreeMap<nat64, User>(USERS_STORAGE_MEMORY_ID);
