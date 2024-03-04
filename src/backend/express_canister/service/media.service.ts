import { mediaStorage, productStorage } from "../db/data";
import Media from "../model/media";
import generateId from "../utils/util";

export function createMedia(product_id: string, url: string): Media | null {

    let id = "";

    const checkProductOpt = productStorage.get(product_id);

    if ("Some" in checkProductOpt) {
        return null;
    }


    while (true) {
        id = generateId();
        const checkProductOpt = mediaStorage.get(id);
        if ("None" in checkProductOpt) {
            break;
        }
    }

    const media: Media = {
        id: id,
        product_id: product_id,
        url: url
    };

    mediaStorage.insert(media.id, media);
    return media;
}

export function deleteMedia(id: string): boolean {
    const deletedMediaOpt = mediaStorage.remove(id);
    if ("None" in deletedMediaOpt) {
        return false;
    }
    return true;
}