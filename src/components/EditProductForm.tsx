import {productStock} from "../../domain/dto";
import {useState} from "react";
import upsertProductRequest from "../../request/UpsertProductRequest";

export default function EditProductForm({product}: { product: productStock | null }) {
    const [errors, setErrors] = useState(null);
    const formName = 'upsertProductForm';

    function upsertProduct(ev) {
        ev.preventDefault();
        let formEl = new FormData(document.forms.namedItem(formName));
        upsertProductRequest(formEl).then((data) => {
            if (!data.success) {
                console.log(data.errors);
                setErrors(data.errors);
            }
        });
    }

    interface data {
        sectionName: string,
        sectionIdentifier: string,
        collapsedHTML: React.ReactNode
    }

    function getSectionHtml({sectionName, sectionIdentifier, collapsedHTML}: data) {
        return <div>
            <a className="btn btn-primary mb-1 btn-block" data-bs-toggle="collapse" href={`#${sectionIdentifier}`}
               role="button"
               aria-expanded="false" aria-controls={`#${sectionIdentifier}`}>
                <p className="text-start">{sectionName}</p>
            </a>
            <div className="collapse" id={`${sectionIdentifier}`}>
                {collapsedHTML}
            </div>
        </div>
    }

    return <>
        <div>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            <form onSubmit={upsertProduct} method={"post"} id={formName}>
                {getSectionHtml({
                    sectionName: 'Identyfikator',
                    sectionIdentifier: 'identifiers',
                    collapsedHTML: (
                        <div>
                            <label htmlFor="name">Nazwa produktu</label>
                            <input type="text" id="name" defaultValue={product?.description?.name} name="name" />

                            <label htmlFor="ean">Ean</label>
                            <input type="text" id="ean" defaultValue={product?.products_ean?.ean} name="ean" />
                        </div>
                    )
                })}
                {getSectionHtml({
                    sectionName: 'Ilość',
                    sectionIdentifier: 'stockData',
                    collapsedHTML: (
                        <div>
                            <label htmlFor={'amount'}>Ilość</label>
                            <input type={'text'} id={'amount'} value={product?.amount} name={'amount'}/>


                            <label htmlFor={'net_weight'}>Masa całkowita</label>
                            <input type={'text'} id={'net_weight'} value={product?.net_weight} name={'net_weight'}/>

                            <label htmlFor={'unit_weight'}>Masa netto</label>
                            <input type={'text'} id={'unit_weight'} value={product?.unit_weight} name={'unit_weight'}/>
                        </div>
                    )
                })}
                {getSectionHtml({
                    sectionName: 'Inne',
                    sectionIdentifier: 'other',
                    collapsedHTML: (
                        <div>
                            <label htmlFor={'expiration_date'}>Data ważności</label>
                            <input type={'date'} id={'expiration_date'} value={product?.expiration_date} name={'expiration_date'}/>
                            <label htmlFor={'price'}>Cena</label>
                            <input type={'text'} id={'price'} value={product?.price} name={'price'}/>
                        </div>
                    )
                })}
                {getSectionHtml({
                    sectionName: 'Opis',
                    sectionIdentifier: 'description',
                    collapsedHTML: (
                        <div>
                            <label htmlFor={'company'}>Marka</label>
                            <input type={'text'} id={'company'} value={product?.description?.company} name={'company'}/>

                            <label htmlFor={'img_url'}>Zdjęcie</label>
                            <input disabled type={'text'} id={'img_url'} value={product?.description?.img_url} name={'img_url'}/>
                        </div>
                    )
                })}
                <button className={"btn btn-primary"} id="submit_button">Dodaj produkt</button>
            </form>
        </div>
    </>
}