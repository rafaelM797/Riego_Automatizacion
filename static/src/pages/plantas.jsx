import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Plantas = () => {
  const navigate = useNavigate();

  const flores = [
    {
      nombre: 'Cempoalxóchitl',
      sol: 'Sol pleno',
      humedad: 'Moderada',
      temperatura: '15–25°C',
    },
    {
      nombre: 'Dalia',
      sol: 'Sol parcial',
      humedad: 'Alta',
      temperatura: '18–27°C',
    },
    {
      nombre: 'Gladiola',
      sol: 'Sol pleno',
      humedad: 'Regular',
      temperatura: '16–24°C',
    },
  ];

  return (
    <Container className="main-container py-4 text-white">
      <h1 className="text-center mb-4">Flores</h1>

      <div className="text-center mt-4">
        <button className="btn btn-volver" onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </div>

      <Row className="g-4 text-center mt-4">
        {flores.map((flor, idx) => (
          <Col key={idx} md={4} sm={6} xs={12}>
            <Card className="mb-3 shadow bg-transparent border-light text-white h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                <Card.Title style={{ fontSize: "1.5rem" }}>{flor.nombre}</Card.Title>
                <div className="d-flex flex-column mt-3 gap-2">
                  <div>
                    <i className="bi bi-sun me-2"></i>
                    <strong>Luz:</strong> {flor.sol}
                  </div>
                  <div>
                    <i className="bi bi-droplet me-2"></i>
                    <strong>Humedad:</strong> {flor.humedad}
                  </div>
                  <div>
                    <i className="bi bi-thermometer me-2"></i>
                    <strong>Temperatura:</strong> {flor.temperatura}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Plantas;