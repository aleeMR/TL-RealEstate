import axios from 'axios';
import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Menu from './../../components/menu/menu.component';

class Home extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

        this.loadVisits();
    }

    async loadVisits(){
        await axios.get(`${ process.env.REACT_APP_SERVER }/api/visits`)
            .then( res => {
                let state = this.state;
                state.list = res.data.visits;
                this.setState(state);
            }).catch(function () {
                alert("Error inesperado !!!");
            })
    }

    scheduleVisit(id){ 
        let confirmation = window.confirm('¿Esta seguro de agendar esta visita?') ? true : false

        if (confirmation) {
            axios.post(`${ process.env.REACT_APP_SERVER }/api/visits/${ id }`).
                then( res => {
                    const msg = res.data.msg;
                    alert(msg);
                    window.location.reload();
                }).catch(function () {
                    alert("Error inesperado !!!")
                })
        }
    }

    render () {
        return (
        <>
            <Menu />
            <div className="container-title">
                <h2>Reservar Espacios</h2>
                <h6>Espacios de visita disponibles:</h6>
            </div>
            <div className="container-cards">
                {
                    this.state.list.map((visit) =>
                        <Card className="container-card">
                            <Card.Body className="container-bodyCard">
                                <Card.Title className="style-title">{ visit.property }</Card.Title>
                                <div className="row text-left">
                                    <Card.Subtitle className="col-sm-5">Fecha:</Card.Subtitle>
                                    <Card.Text className="col-sm-7">{ visit.date_visit }</Card.Text>
                                </div>
                                <div className="row text-left">
                                    <Card.Subtitle className="col-sm-5">Hora inicio:</Card.Subtitle>
                                    <Card.Text className="col-sm-7">{ visit.start_time }</Card.Text>
                                </div>
                                <div className="row text-left">
                                    <Card.Subtitle className="col-sm-5">Hora fin:</Card.Subtitle>
                                    <Card.Text className="col-sm-7">{ visit.end_time }</Card.Text>
                                </div>
                                <Button className="style-button" onClick={ () => this.scheduleVisit(visit._id) } >
                                    Reservar
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                }
            </div>
        </>);
    }
}

export default Home;