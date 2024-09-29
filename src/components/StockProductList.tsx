import { productStock } from "../../domain/dto";
import Pagination from "./Pagination";
interface StockProductListProps {
    stock: productStock[] | null;
    returnProductCallback: ((arg: productStock) => void) | null;
}
export default function StockProductList({ stock, returnProductCallback }: StockProductListProps) {
    return (
        stock?.length > 0 ? (
            <>
                <Pagination pages={1}/>
                {stock.map(product => (
                    <div>
                        <a className="btn btn-primary mb-1 btn-block" data-bs-toggle="collapse" href={`#product${product.id}`} role="button"
                           aria-expanded="false" aria-controls={`#product${product.id}`}>
                            <p className="text-start">{product.description.name}</p>
                            {product.expiration_date ?
                                <p className="text-end">{'Data przydatności: ' + product.expiration_date}</p>
                                : ''
                            }

                        </a>
                        <div className="collapse" id={`product${product.id}`}>
                            <div className="card card-body">
                                <p>Ilość: {product.amount}</p>
                                <p>Data przydatności: {product.expiration_date}</p>
                                <p>Masa netto: {product.net_weight}</p>
                                <p>Cena : {product.price}</p>
                                <p>Masa jednostki: {product.unit_weight}</p>
                                <p>Ean: {product.products_ean.ean}</p>
                                {returnProductCallback ? <button className={"btn btn-primary mb-1 btn-block"} onClick={() => returnProductCallback(product)}>Wybierz</button> : ''}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        ) : (
            ''
            // <div className="loader"></div>
        )
    );
}