import axiosClient from "../src/axios-client.js";
import {pantry, user} from "../domain/pantry";
export default async function createPantryRequest(pantry: FormData): Promise<pantry|null> {
    try {
        const { data } = await axiosClient.post(
            `/pantry/create`,
            pantry
        );
        return {
            id: data.id,
            description: data.description,
            name: data.name,
            users: []
        };

    } catch (err) {
        console.error('Error fetching product:', err);
        return null;
    }
}