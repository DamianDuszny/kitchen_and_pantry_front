import {useState} from "react";
import FindProducts from "../components/FindProducts";
import EditProductForm from "../components/EditProductForm";
import StockProductList from "../components/StockProductList";
import {productStock} from "../../domain/dto";
export default function AddPantryProduct() {
    const [productsStock, setProductsStock] = useState<productStock | null>(null);
    return <>
        <button className={"btn btn-primary mb-1 btn-block"} onClick={() => setProductsStock(null)}>Powrót</button>
        <EditProductForm product={productsStock}/>
    </>
}
