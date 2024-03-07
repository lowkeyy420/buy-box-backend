import { Request } from "express";
import { categoryStorage } from "../db/data";
import Category from "../model/category";

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