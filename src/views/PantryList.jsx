import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import '../assets/noMoreTables.css';
import '../assets/loading.css';
import { useParams, Link } from 'react-router-dom';

export default function PantryList() {
    const [response, setResponse] = useState([]);
    const { page } = useParams();

    useEffect(() => {
        getPantryData();
    }, [page]); // Dodajemy `page` do zależności, aby ponownie załadować dane przy zmianie strony

    function getPantryData() {
        let url = '/products';
        setResponse({});

        if (page) {
            url += '?page=' + page;
        }
        axiosClient.get(url)
            .then((response) => {
                setResponse(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }

    let links = [];

    if (response?.last_page > 1) {
        for (let i = 1; i <= response.last_page; i++) {
            links.push(
                <Link key={i} className="page-link" to={`/spizarnia/lista/${i}`}>{i}</Link>
            );
        }
    }

    return (
        response.data?.length > 0 ? (
            <>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            links.map(
                                (link, index) => (
                                    <li key={index} className={`page-item ${parseInt(page) === index + 1 ? 'active' : ''}`}>
                                        {link}
                                    </li>
                                )
                            )
                        }
                    </ul>
                </nav>
                        {response.data.map(product => (
                            <div>
                                <p>
                                    <a className="btn btn-primary mb-1 btn-block" data-bs-toggle="collapse" href={`#product${product.id}`} role="button"
                                       aria-expanded="false" aria-controls={`#product${product.id}`}>
                                        {product.description?.name}
                                    </a>
                                </p>
                                <div className="collapse" id={`product${product.id}`}>
                                    <div className="card card-body">
                                        <p>Ilość: {product.amount}</p>
                                        <p>Data przydatności: {product.expiration_date}</p>
                                        <p>Masa netto: {product.net_weight}</p>
                                        <p>Cena : {product.price}</p>
                                        <p>Masa jednostki: {product.unit_weight}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
            </>
        ) : (
            <div className="loader"></div>
        )
    );
}
