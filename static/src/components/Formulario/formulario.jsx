import { useState } from "react";
import "./Formulario.css";

export function Formulario({ onLogin, setNombre }) {
  const [nombreInput, setNombreInput] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

 const handleSubmit = (e) => {
        e.preventDefault();
        fetch('admin/login', { // O '/admin/login' según el formulario
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: nombreInput, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setNombre(nombreInput);
                onLogin(true, data.redirect, nombreInput); // Llama a handleLogin con success, redirect y nombre
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

  return (
    <section className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-white">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={nombreInput}
                onChange={(e) => setNombreInput(e.target.value)}
                placeholder="Nombre de usuario"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="form-control"
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Formulario;
