import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../assets/componentNavButtons.css';

export default function Pantry() {
    const location = useLocation();
    const links = [
        { to: "/spizarnia/lista", label: "Lista produktów" },
        { to: "/spizarnia/dodaj-produkt", label: "Dodaj produkt" },
    ];

    return (
        <div>
            <span>
                <Outlet/>
            </span>
        </div>
    );
}
