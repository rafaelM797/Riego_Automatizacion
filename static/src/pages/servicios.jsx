import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de importar esto

const BotonesRedes = () => (
  <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <button className="btn btn-outline-light d-flex align-items-center">
        <i className="bi bi-facebook me-2"></i>Facebook
      </button>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <button className="btn btn-outline-light d-flex align-items-center">
        <i className="bi bi-instagram me-2"></i>Instagram
      </button>
    </a>
    <a href="https://wa.me/5215580262733" target="_blank" rel="noopener noreferrer">
      <button className="btn btn-outline-light d-flex align-items-center">
        <i className="bi bi-whatsapp me-2"></i>WhatsApp
      </button>
    </a>
  </div>
);

const Soporte = () => {
  const navigate = useNavigate();

  return (
    <Container className="main-container py-4 text-white">
      <h1 className="text-center mb-4">SERVICIOS</h1>

      {/* Botón para volver al inicio */}
      <div className="text-center mt-4">
        <button className="btn btn-volver" onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </div>

      {/* Servicios ofrecidos */}
      <section className="servicios-ofrecidos mt-5">
        <h2 className="text-center mb-3">Servicios que Ofrecemos</h2>
        <Row className="text-center">
          <Col md={4}>
            <Card className="mb-3 shadow bg-transparent border-light text-white">
              <Card.Body>
                <i className="bi bi-wrench display-4 mb-3 text-white"></i>
                <Card.Title>Instalación de Equipos</Card.Title>
                <Card.Text>Montaje y configuración de sistemas de monitoreo agrícola.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 shadow bg-transparent border-light text-white">
              <Card.Body>
                <i className="bi bi-shield-check display-4 mb-3 text-white"></i>
                <Card.Title>Garantía</Card.Title>
                <Card.Text>Cubrimos defectos de fábrica y fallas técnicas por 12 meses.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 shadow bg-transparent border-light text-white">
              <Card.Body>
                <i className="bi bi-chat-dots display-4 mb-3 text-white"></i>
                <Card.Title>Asesorías</Card.Title>
                <Card.Text>Apoyo técnico y recomendaciones para el cuidado de cultivos.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Información de contacto */}
      <section className="contact-info mt-5">
        <h2 className="text-center mb-3">Información de Contacto</h2>
        <Row className="text-center">
          <Col md={4}>
            <h5>Teléfonos:</h5>
            <p>+ 52(55) 80262733</p>
            <p>+ 52(55) 51493022</p>
            <p>+ 52(22) 02323158</p>
          </Col>
          <Col md={4}>
            <h5>Correos Electrónicos:</h5>
            <p>soporte@cultivos.com</p>
            <p>atencion@cultivos.com</p>
          </Col>
          <Col md={4}>
            <h5>Horario de Atención:</h5>
            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p>Sábado: 10:00 AM - 2:00 PM</p>
            <p>Domingo: Cerrado</p>
          </Col>
        </Row>
      </section>

      {/* Botones de Redes Sociales */}
      <BotonesRedes />
    </Container>
  );
};

export default Soporte;
