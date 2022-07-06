import React, { Component, Fragment } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'

const TopNav = () => {

    return (

        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Welcome</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="game">Tic-Tac-Toe</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                

            </Container>
        </Navbar>
    );

}
 
export default TopNav;