import { useParams } from "react-router-dom";
import axios from 'axios';
import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Menu from '../../components/menu/menu.component'

function withParams(Component) {
    return props => <Component { ...props } params={ useParams() } />;
}

class Visits extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            property: '',
            num_visitors: 0,
            date_visit: null,
            start_time: null,
            end_time: null
        };
    }

    onChangeProperty(event){
        let state = this.state;
        state.property = event.target.value;
        this.setState(state);
    }

    onChangeNumVisitors(event){
        let state = this.state;
        state.num_visitors = event.target.value;
        this.setState(state);
    }

    onChangeDateVisit(event){
        let state = this.state;
        state.date_visit = event.target.value;
        this.setState(state);
    }

    onChangeStartTime(event){
        let state = this.state;
        state.start_time = event.target.value;
        this.setState(state);
    }

    onChangeEndTime(event){
        let state = this.state;
        state.end_time = event.target.value;
        this.setState(state);
    }

    handleForm(event){
        event.preventDefault();

        let data = {
            property: this.state.property,
            num_visitors: parseInt(this.state.num_visitors),
            date_visit: this.state.date_visit,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
        };

        axios.post(`${ process.env.REACT_APP_SERVER }/api/visits/new`, data)
            .then( res => {
                const msg = res.data.msg;
                alert(msg);
                window.location.reload();
            }).catch(function () {
                alert("Error inesperado !!!");
            })
        
    }

    render () {
        return (
            <>
                <Menu />
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        <div className="container-form">
                            <Form onSubmit={ this.handleForm.bind(this) }>
                                <h3>Registrar Espacio</h3>
                                <Form.Group className="mb-3 text-left">
                                    <Form.Label>Inmueble</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        readonly={ true } 
                                        value={ this.state.property } 
                                        onChange={ this.onChangeProperty.bind(this) }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 text-left" >
                                    <Form.Label>Cantidad máxima de visitantes</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        value={ this.state.num_visitors }
                                        onChange={ this.onChangeNumVisitors.bind(this) }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 text-left" >
                                    <Form.Label>Fecha de visita</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        value={ this.state.date_visit }
                                        onChange={ this.onChangeDateVisit.bind(this) }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 text-left">
                                    <Form.Label>Hora inicio</Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        value={ this.state.start_time } 
                                        onChange={ this.onChangeStartTime.bind(this) }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 text-left">
                                    <Form.Label>Hora fin</Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        value={ this.state.end_time } 
                                        onChange={ this.onChangeEndTime.bind(this) }
                                    />
                                </Form.Group>
                                <Button type="submit">
                                    Guardar
                                </Button>
                            </Form>
                        </div>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </>
        );
    }
};

export default withParams(Visits);