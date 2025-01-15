import { useState, useEffect } from "react";
import '../assets/loading.css';
import StockProductList from '../components/StockProductList';
import findProductsRequest from '../../request/FindProductsRequest';
import { productStock } from "../../domain/dto.js";
import EditProductForm from "../components/EditProductForm";
import PantrySelect from "../components/PantrySelect";
import FindProducts from "../components/FindProducts";

export default function PantriesStockList() {
    const [stockData, setStockData] = useState([]);
    const [productsStock, setProductsStock] = useState<productStock | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Nowy stan
    let page = 1;

    useEffect(() => {
        const fetchData = async (page) => {
            setIsLoading(true); // Rozpoczęcie ładowania
            try {
                const result = await findProductsRequest('', page);
                setStockData(result);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            } finally {
                setIsLoading(false); // Koniec ładowania
            }
        };

        fetchData(page);
    }, [page]);

    if (isLoading) {
        return (
            <div className="loader"></div> // Wskaźnik ładowania
        );
    }

    return productsStock ? (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <button className="btn-secondary btn mb-1" onClick={() => setProductsStock(null)}>Powrót</button>
                    </div>
                    <div className="col-6">
                        <div className="fs-4 fw-bold text-info">{productsStock.description?.name ?? 'Brak nazwy'} ({productsStock.pantry.name})</div>
                    </div>
                </div>
            </div>

            <EditProductForm product={productsStock} />
        </>
    ) : (
        <div>
            <PantrySelect />
            {StockProductList({ stock: stockData, returnProductCallback: setProductsStock })}
        </div>
    );
}
