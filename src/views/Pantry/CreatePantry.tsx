import {useState} from "react";
import createPantryRequest from "../../../request/CreatePantryRequest";

export default function CreatePantry() {
    const formId = 'createPantryForm';

    function sendRequest(ev) {
        let formEl = new FormData(document.forms.namedItem(formId));
        createPantryRequest(formEl).then((data) => {
            console.log(data);
        });
        ev.preventDefault();
    }

    return <>
        <form onSubmit={sendRequest} id={formId} method={"post"}>
            <div>
                <label htmlFor="name">Nazwa</label>
                <input type="text" id="name" name="name"/>
            </div>
            <div>
                <label htmlFor="description">Opis</label>
                <input type="text" id="description" name="description"/>
            </div>
            <button className={"btn btn-primary"}>Dodaj!</button>
        </form>
    </>
}
