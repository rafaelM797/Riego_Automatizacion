import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de importar esto

const Noticias = () => {
  const navigate = useNavigate();

  return (
    <Container className="main-container py-4 text-white">
      <h1 className="text-center mb-4">Noticias</h1>

      {/* Botón para volver al inicio */}
      <div className="text-center mt-4">
        <button className="btn btn-volver" onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </div>

      {/* Sección de Noticias */}
      <section className="noticias mt-5">
        <h2 className="text-center mb-4">Últimas Noticias </h2>
        <Row className="g-4">
        <Col md={4}>
  <Card className="shadow bg-transparent border-light text-white">
    <Card.Body>
      <Card.Title>Capacitación Gratuita</Card.Title>
      <Card.Text>
        Se abrirán talleres gratuitos sobre técnicas de riego y cuidado del suelo este fin de semana.
        
      </Card.Text>
    </Card.Body>
  </Card>
</Col>


          <Col md={4}>
            <Card className="shadow bg-transparent border-light text-white">
              <Card.Body>
                <Card.Title>Cosechas de Temporada</Card.Title>
                <Card.Text>
                  Se espera una excelente producción de tomates este mes gracias al clima favorable.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow bg-transparent border-light text-white">
              <Card.Body>
                <Card.Title>Alerta Sanitaria</Card.Title>
                <Card.Text>
                  Detectada plaga en cultivos de lechuga en la zona sur. Se recomienda vigilancia continua.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow bg-transparent border-light text-white">
              <Card.Body>
                <Card.Title>Innovaciones Tecnológicas</Card.Title>
                <Card.Text>
                  Nuevos sensores de humedad para monitoreo automático ya disponibles en nuestro catálogo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
    
  );
};

export default Noticias;
