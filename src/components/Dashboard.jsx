import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard-data');
        const data = await response.json();
        setBarData(data.barData);
        setPieData(data.pieData);
        renderCharts(data.barData, data.pieData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
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
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
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
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      <div className="buttons">
        <button onClick={() => navigate('/plantas')}>Plantas</button>
        <button onClick={() => navigate('/services')}>Servicios</button>
        <button onClick={() => navigate('/noticias')}>Noticias</button>
        <button onClick={() => navigate('/soporte')}>Soporte</button>
      </div>
      <div className="charts">
        <canvas id="barChart"></canvas>
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
