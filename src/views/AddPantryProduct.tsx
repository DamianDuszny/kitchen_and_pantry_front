import {useState} from "react";
import FindProducts from "../components/FindProducts";
import EditProductForm from "../components/EditProductForm";
import StockProductList from "../components/StockProductList";
export default function AddPantryProduct() {
    const [stock, setStock] = useState(null);
    const [productsStock, setProductsStock] = useState(null);
    return productsStock ? <>
        <button className={"btn btn-primary mb-1 btn-block"} onClick={() => setProductsStock(null)}>Powrót</button>
        <EditProductForm product={productsStock}/>
    </> : <>
        <FindProducts callback={(stock) => setStock(stock)}/>
        <StockProductList stock={stock} returnProductCallback={setProductsStock}/>
    </>
}
