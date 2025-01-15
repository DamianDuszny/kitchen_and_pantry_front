import React from 'react';
import { Outlet } from 'react-router-dom';
import '../assets/componentNavButtons.css';

export default function Products() {
    return (
        <div>
            <span>
                <Outlet/>
            </span>
        </div>
    );
}
