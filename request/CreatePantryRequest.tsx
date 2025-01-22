import axiosClient from "../src/axios-client.js";
import {requestResponse} from "../domain/requestResponse";

export default async function createPantryRequest(pantry: FormData): Promise<requestResponse | null> {
    try {
        const {data} = await axiosClient.post(
            `/pantry/create`,
            pantry
        );
        return {
            message: 'Udało się utworzyć spiżarnie!',
            success: true,
            objectData: {
                id: data.id,
                description: data.description,
                name: data.name,
                users: []
            }
        };

    } catch (err) {
        console.error('Error fetching product:', err);
        return null;
    }
}