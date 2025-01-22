import axiosClient from "../src/axios-client.js";
import {productStock} from "../domain/dto";
import {requestResponse} from "../domain/requestResponse";

export default async function upsertProductRequest(productStock: productStock | FormData): Promise<requestResponse> {

    const data = await axiosClient.post('/pantry/4/products', productStock)
        .catch(err => {
            return err.response;//@todo czy na pewno zadziała dobrze?
        });
    const resp: requestResponse = {
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