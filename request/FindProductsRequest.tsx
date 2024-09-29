import axiosClient from "../src/axios-client.js";
import { description, products_ean, productStock } from "../domain/dto";

export default async function findProductsRequest(identifier: string | null, page?: number): Promise<productStock[] | null> {
    try {
        let url = `/products/${identifier}`;
        if(page) {
            url += `?page=${page}`;
        }
        const { data } = await axiosClient.get(url);
        let arr = [];
        data.map((dt) => {
            const productDescription: description = {
                company: dt.description.company,
                id: dt.description.id,
                img_url: dt.description.img_url,
                name: dt.description.name,
                users_products_stock_id: dt.description.users_products_stock_id
            };

            const productEan: products_ean = {
                ean: dt.products_ean.ean,
                id: dt.products_ean.id
            };

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
                products_ean: productEan
            });
        })
        return arr;

    } catch (err) {
        console.error('Error fetching product:', err);
        return null;
    }
}
