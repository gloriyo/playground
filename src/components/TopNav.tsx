import React, { Component, Fragment } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'

const TopNav = () => {

    return (

        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Welcome</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="tic-tac-toe">Tic-Tac-Toe</Nav.Link>
                    <Nav.Link href="bricks">Bricks</Nav.Link>
                </Nav>
                

            </Container>
        </Navbar>
    );

}
 
export default TopNav;