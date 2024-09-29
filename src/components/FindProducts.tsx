import findProductsRequest from "../../request/FindProductsRequest";
import {useCallback} from "react";
export default function FindProducts(returnResultCallback) {
    const sendRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        findProductsRequest(value).then((data) => {
            returnResultCallback.callback(data);
        });
    };
    const debouncedUpsertProductRequest = useCallback(debounce(sendRequest, 500), []);
    return <>
        <div>
            <label htmlFor="ean">Ean</label>
            <input onChange={debouncedUpsertProductRequest} type="text" id="ean" name="ean"/>
        </div>
        <div>
            <label htmlFor="name">Nazwa</label>
            <input type="text" id="name" name="name"/>
        </div>
    </>
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}