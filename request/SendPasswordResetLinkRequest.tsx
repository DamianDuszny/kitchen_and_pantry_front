import axiosClient from "../src/axios-client.js";
import {requestResponse} from "../domain/requestResponse";
export default async function SendPasswordResetLinkRequest(emailAddress: string): Promise<requestResponse> {
    let result: requestResponse = {
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