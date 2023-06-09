import React from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";

const ComponentTwo = () => {
  return (
    <div>
      <Card.Body className="p-4">
                <Row >
                  <Col lg={3} >
                    <Form.Label htmlFor="invoicenoInput">
                      Echéance
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="invoicenoInput"
                      placeholder="Taper l'echeance "
                      defaultValue="00"
                    />
                  </Col>
                  <Col lg={3} >
                    <div>
                      <Form.Label htmlFor="date-field">Date</Form.Label>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Selectionner Date"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                      />
                    </div>
                  </Col>
                 
                  <Col lg={3} >
                    <Form.Label htmlFor="invoicenoInput">
                      Numéro de Chèque
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="invoicenoInput"
                      placeholder="Taper le numero "
                      defaultValue="00"
                    />
                  </Col>
                  <Col lg={3} >
                    <Form.Label htmlFor="invoicenoInput">
                      Banque (agence)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="invoicenoInput"
                      placeholder="Nom de l'agence "
                      defaultValue=""
                    />
                  </Col>
                </Row>
              </Card.Body>
    </div>
  )
}

export default ComponentTwo