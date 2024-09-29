import {Link, useParams} from "react-router-dom";

export default function Pagination(pages) {
    let links = [];
    const {page} = useParams();
    if (pages > 1) {
        for (let i = 1; i <= pages; i++) {
            links.push(
                <Link key={`lnik_${i}`} className="page-link" to={`/spizarnia/lista/${i}`}>{i}</Link>
            );
        }
        return <>
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
        </>
    }
}