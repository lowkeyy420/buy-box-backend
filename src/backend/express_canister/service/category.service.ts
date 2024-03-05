import { Request } from "express";
import { categoryStorage } from "../db/data";
import Category from "../model/category";

export function seedCategory() {
    categoryStorage.insert("0", new Category("0", "Electronics"));
    categoryStorage.insert("1", new Category("1", "Clothing"));
    categoryStorage.insert("2", new Category("2", "Books"));
    categoryStorage.insert("3", new Category("3", "Furniture"));
    categoryStorage.insert("4", new Category("4", "Toys"));
}

export function createCategory(req: Request<any, any, any>, res: any) {
    const id = categoryStorage.len() + "";
    const category: Category = {
        ...req.body,
        id: id,
    };
    categoryStorage.insert(category.id, category);
    return res.json(category);
}

export function getCategoryName(category_id: string) {
    const categoryOpt = categoryStorage.get(category_id);
    if ("None" in categoryOpt) {
        return "";
    }
    return categoryOpt.Some.name;
}