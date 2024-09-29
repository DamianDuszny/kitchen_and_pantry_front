import {useState, useEffect} from "react";
import '../assets/noMoreTables.css';
import '../assets/loading.css';
import StockProductList from '../components/StockProductList';
import findProductsRequest from '../../request/FindProductsRequest';

export default function PantryList() {
    const [stockData, setStockData] = useState([]);
    let page = 1;
    useEffect(() => {
        // Asynchroniczna funkcja do pobierania danych
        const fetchData = async (page) => {
            try {
                const result = await findProductsRequest('', page);
                setStockData(result);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData(page);
    }, [page]);

    return (
        <div>
            {StockProductList({ stock: stockData, requestData: null })}
        </div>
    );
}