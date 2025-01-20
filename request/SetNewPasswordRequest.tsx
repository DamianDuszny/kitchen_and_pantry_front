import axiosClient from "../src/axios-client.js";
import {response} from "../domain/response";
export default async function SetNewPasswordRequest(payLoad: Object): Promise<response> {
    let result: response = {
        success: false,
        message: '',
        errors: [],
    };
    axiosClient
        .post("/user/set-new-password", payLoad)
        .then(({ data }) => {
            result.success = true;
            result.message = data.message;
        })
        .catch((err) => {
            result.message = err.response.message;
        });
    return result;
}