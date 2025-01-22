import {useState} from "react";
import createPantryRequest from "../../../request/CreatePantryRequest";
import RequestResponseMessage from "../../components/ResponseField";
import {requestResponse} from "../../../domain/requestResponse";

export default function CreatePantry() {
    const formId = 'createPantryForm';
    const [message, setMessage] = useState<requestResponse | null>(null);
    function sendRequest(ev) {
        let formEl = new FormData(document.forms.namedItem(formId));
        createPantryRequest(formEl).then((data) => {
            setMessage(data);
        });
        ev.preventDefault();
    }

    return <>
        <form onSubmit={sendRequest} id={formId} method={"post"}>
            <RequestResponseMessage requestResponse={message}/>
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
