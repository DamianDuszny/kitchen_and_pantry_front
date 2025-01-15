import axiosClient from "../src/axios-client.js";
import {response} from "../domain/response";
import {pantry, user} from "../domain/pantry";
export default async function getAvailablePantryInfo(): Promise<pantry[]|null> {
    try {
        const { data } = await axiosClient.get(`/pantry/list`);
        let arr = [];
        data.map((dt) => {
            const pantry: pantry = {
                id: dt.id,
                description: dt.description,
                name: dt.name,
                users: []
            };
            dt.users.map((user) => {
                pantry.users.push({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id: user.id,
                    user_role_desc: user.desc
                });
            })
            arr.push(pantry);
        })
        return arr;

    } catch (err) {
        console.error('Error fetching product:', err);
        return null;
    }
}