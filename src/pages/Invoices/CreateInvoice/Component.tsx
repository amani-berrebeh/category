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

const Component = () => {
  return (
    <div>
      <Card.Body className="p-4">
                <Row className="g-3">
                  <Col lg={6} sm={9}>
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
                  <Col lg={6} sm={9}>
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
                 
                  {/* <Col lg={3} sm={6}>
                    <div>
                      <Form.Label htmlFor="totalamountInput">
                        Montant Total
                      </Form.Label>
                    
                    </div>
                  </Col> */}
                </Row>
              </Card.Body>
    </div>
  )
}

export default Component