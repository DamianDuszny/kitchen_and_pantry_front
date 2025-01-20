import axiosClient from "../src/axios-client.js";
import {response} from "../domain/response";
export default async function SendPasswordResetLinkRequest(emailAddress: string): Promise<response> {
    let result: response = {
        success: false,
        message: '',
        errors: [],
    };
    await axiosClient
        .get("/user/send-password-reset-link?email_address="+emailAddress)
        .then(({ data }) => {
            result.success = true;
            result.message = data.message;
        })
        .catch((err) => {
            result.message = err.response.data.message;
        });
    return result;
}