import { Link } from 'react-router-dom';
import React from 'react';

import Nav from 'react-bootstrap/Nav';

class NavCustom extends React.Component{
  render (){
    return (
      <Nav>
        <Nav.Item>
          <Link to="/" className="nav-link">Visitas</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/visits/create" className="nav-link">Crear Visita</Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default NavCustom;