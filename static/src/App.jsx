import fondo from './img/img6.jpeg';

import React, { useState, useEffect } from 'react'; // Importa useEffect

import { Routes, Route, useNavigate } from 'react-router-dom';
import Formulario from './Formulario/formulario';
import Plantas from './pages/plantas';
import Servicios from './pages/servicio';
import Noticias from './pages/noticias';
import Soporte from './pages/soporte';
import Dashboard from './pages/Dashboard'; // Asumo que tienes un Dashboard
import AdminDashboard from './pages/AdminDashboard'; 
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const barData = [
  { name: 'Humedad', value: 65 },
  { name: 'Temperatura', value: 25 },
  { name: 'Agua', value: 80 },
];

const pieData = [
  { name: 'Seco', value: 20 },
  { name: 'Húmedo', value: 80 },
];

const COLORS = ['#0088FE', '#00C49F'];

const Dashboard = ({ nombre }) => {
  const navigate = useNavigate();
    
  } 
  return (
    <div className="dashboard-container">
      <nav className="top-navbar">
        <div className="navbar-brand">Control de Cultivos</div>
        <ul className="navbar-nav">
          <li className="nav-item"><a href="/" className="nav-link" onClick={() => navigate('/')}><i className="bi bi-house"></i> Inicio</a></li>
          <li className="nav-item"><a href="/plantas" className="nav-link" onClick={() => navigate('/plantas')}><i className="bi bi-flower2"></i> Plantas</a></li>
          <li className="nav-item"><a href="/servicios" className="nav-link" onClick={() => navigate('/servicios')}><i className="bi bi-tools"></i> Servicios</a></li>
          <li className="nav-item"><a href="/noticias" className="nav-link" onClick={() => navigate('/noticias')}><i className="bi bi-newspaper"></i> Noticias</a></li>
          <li className="nav-item"><a href="/soporte" className="nav-link" onClick={() => navigate('/soporte')}><i className="bi bi-headset"></i> Soporte</a></li>
          <li className="nav-item"><a href="/admin/dashboard" className="nav-link"><i className="bi bi-person"></i> Admin</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <section className="welcome-section">
          <h1>Bienvenido, {nombre}</h1>
          <p>Aquí tienes un resumen de la información importante.</p>
        </section>

        <section className="data-section">
          <div className="chart-container">
            <div className="bar-chart">
              <h2>Datos de Cultivo</h2>
              <canvas id="barChart"></canvas>
            </div>
            <div className="pie-chart">
              <h2>Estado del Suelo</h2>
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </section>
        <section className="other-info">
        </section>
      </main>
    </div>
  );

import React from 'react';
import Chart from 'chart.js/auto';

function App() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('/api/dashboard-data')
      .then((response) => response.json())
      .then((data) => {
        setBarData(data.barData);
        setPieData(data.pieData);
        renderCharts(data.barData, data.pieData);
      });
  }, []);

  const renderCharts = (barData, pieData) => {
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: barData.map((item) => item.name),
        datasets: [
          {
            label: 'Valores',
            data: barData.map((item) => item.value),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: pieData.map((item) => item.name),
        datasets: [
          {
            label: 'Porcentaje',
            data: pieData.map((item) => item.value),
            backgroundColor: ['rgba(0, 128, 0, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(0, 128, 0, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Panel de Control</h1>
      <div className="chart-container">
        <canvas id="barChart"></canvas>
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
}

export default App;