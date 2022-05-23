import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavCustom from './nav.component';

class Menu extends React.Component{
    render(){
        return(
            <Row className="container-navbar">
                <Col sm={1}>
                    <img src="/logo.png" class="logo" alt="icono"/>
                </Col>
                <Col sm={8}>  
                    <NavCustom/>
                </Col>
            </Row> 
        );
    }
}

export default Menu;

