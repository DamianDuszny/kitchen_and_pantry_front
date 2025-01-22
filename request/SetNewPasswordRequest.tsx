import axiosClient from "../src/axios-client.js";
import {requestResponse} from "../domain/requestResponse";
export default async function SetNewPasswordRequest(payLoad: Object): Promise<requestResponse> {
    let result: requestResponse = {
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