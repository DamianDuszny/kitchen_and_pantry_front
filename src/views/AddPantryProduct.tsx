import {useState} from "react";
import FindProducts from "../components/FindProducts";
import EditProductForm from "../components/EditProductForm";
import StockProductList from "../components/StockProductList";
import {productStock} from "../../domain/dto";
export default function AddPantryProduct() {
    const [stock, setStock] = useState(null);
    const [productsStock, setProductsStock] = useState<productStock | null>(null);
    if(productsStock) {
        productsStock.amount = 0;
        productsStock.id = 0;
        productsStock.net_weight = 0;
        productsStock.expiration_date = '';
    }

    function addNewProduct() {
        setProductsStock({
            id: null,
            amount: null,
            created_at: null,
            description: null,
            expiration_date: null,
            net_weight: null,
            price: null,
            unit_weight: null,
            users_id: null,
            products_ean: null,
            pantry: null
        });
    }

    return productsStock ? <>
        <button className={"btn btn-primary mb-1 btn-block"} onClick={() => setProductsStock(null)}>Powrót</button>
        <EditProductForm product={productsStock}/>
    </> : <>
        <FindProducts callback={(stock) => setStock(stock)}/>
        <StockProductList stock={stock} returnProductCallback={setProductsStock}/>
        <button onClick={addNewProduct}>Dodaj nowy produkt</button>
    </>
}
