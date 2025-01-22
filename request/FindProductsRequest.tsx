import axiosClient from "../src/axios-client.js";
import { description, products_ean, productStock, pantry } from "../domain/dto";

export default async function findProductsRequest(identifier: string | null, page?: number, pantry: number = 0): Promise<productStock[] | null> {
    try {
        let url = `/pantry/${pantry}/products/${identifier}`;
        if(page) {
            url += `?page=${page}`;
        }
        const { data } = await axiosClient.get(url);
        let arr = [];
        let pantriesData = [];
        data.map((dt) => {
            console.log(dt);
            const productDescription: description = {
                company: dt.description?.company,
                id: dt.description?.id,
                img_url: dt.description?.img_url,
                name: dt.description?.name,
                users_products_stock_id: dt.description?.users_products_stock_id
            };

            const productEan: products_ean = {
                ean: dt.products_ean?.ean,
                id: dt.products_ean?.id
            };
            let pan: pantry;
            if(pantriesData[dt.pantry.id]) {
                pan = pantriesData[dt.pantry.id];
            } else {
                pan = {
                    id: dt.pantry.id,
                    description: dt.pantry.description,
                    name: dt.pantry.name
                }
            }

            arr.push({
                id: dt.id,
                amount: dt.amount,
                created_at: dt.created_at,
                description: productDescription,
                expiration_date: dt.expiration_date,
                net_weight: dt.net_weight,
                price: dt.price,
                unit_weight: dt.unit_weight,
                users_id: dt.users_id,
                products_ean: productEan,
                pantry: pan
            });
        })
        return arr;

    } catch (err) {
        console.error('Error fetching product:', err);
        return null;
    }
}
