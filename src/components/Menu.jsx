import React, { useState } from 'react';
import { Offcanvas, Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useLocation} from "react-router-dom";
export default function Menu() {
const [showMenu, setShowMenu] = useState(true);
const [activeSubmenu, setActiveSubmenu] = useState(null);

const handleClose = () => setShowMenu(false);
const handleShow = () => setShowMenu(true);

const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
};
const location = useLocation();

const isActive = (path) => location.pathname === path;
const handleLinkClick = () => {
    handleClose();
};

const getLink = (path, name) => {
    return  <Link className={`nav-link ${isActive(path) ? 'active' : ''}`} key={path} onClick={handleLinkClick} to={path}>{name}</Link>;
}

const getMenuElementWithSubElements = (name, elements) => {
    return <div>
        <Nav.Link
            href="#"
            onClick={() => toggleSubmenu(name)}
            aria-expanded={activeSubmenu === name}
            aria-controls={`${name}-submenu`}
        >
            {name}
        </Nav.Link>
        {activeSubmenu === name && (
            <Nav className="flex-column ms-4" id={`${name}-submenu`}>
                {elements}
            </Nav>
        )}
    </div>
}

return (
    <>
        <Navbar expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
            </Container>
        </Navbar>
        <Offcanvas show={showMenu} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    {getLink('/profil', 'profil')}
                    {getLink('/przepisy', 'przepisy')}
                    {getLink('/grupy', 'grupy')}
                    {getMenuElementWithSubElements(
                        'Spiżarnia',
                            [
                                getLink('/spizarnia/lista/', 'Produkty'),
                            getLink('/spizarnia/dodaj-produkt', 'Dodaj produkt')
                            ]
                    )}
                    <Nav.Link href="#kontakt" onClick={handleLinkClick}>Kontakt</Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    </>
);
}