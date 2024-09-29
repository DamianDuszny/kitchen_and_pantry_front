import axiosClient from "../src/axios-client.js";
import {response, productStock} from "../domain/dto";

export default async function upsertProductRequest(productStock: productStock | FormData): Promise<response> {

    const data = await axiosClient.post('/products', productStock)
        .catch(err => {
            return err.response;
        });
    const resp: response = {
        message: '',
        errors: [],
        success: true,
    }
    if(data.status !== 201 && data.status !== 200) {
        resp.success = false;
        Object.keys(data.data.errors).forEach(function(key) {
            resp.errors.push(data.data.errors[key]);
        });
    }

    return resp;
}