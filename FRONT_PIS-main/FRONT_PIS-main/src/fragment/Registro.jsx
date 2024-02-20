import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from './Footer';
import '../components/css/InicioSesion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { enviar } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import Navbar from './Navbar';

const Registro = () => {
  const navegation = useNavigate();
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fecha_nacimiento, setFecha_nacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    var datos = {
      "nombres": e.target.elements.nombres.value,
      "apellidos": e.target.elements.apellidos.value,
      "fecha_nacimiento": e.target.elements.fecha_nacimiento.value,
      "direccion": e.target.elements.direccion.value,
      "ocupacion": e.target.elements.ocupacion.value,
      "organizacion": e.target.elements.organizacion.value,
      "correo": e.target.elements.correo.value,
      "clave": e.target.elements.clave.value
    };
    enviar("/persona/save", datos).then((info) => {
      console.log(info.code);
      if (info.code === 200) {
        mensajes("Te has registrado en el sistema!", "success","Tu cuenta se encuentra en espera");
        navegation('/inicio-sesion');
      } else {
        setError(info.msg); // Cambié setError(info.msg) para mostrar el mensaje de error
        mensajes("Error de registro", "error", error);
        
      }
    }
    );
   };

  return (<div>
    <Navbar/>
    <div className="mb-4 registro-container container mt-5">
      <h1 className="text-center mb-4"style={{ color: "#100955" }}>Registro</h1>
      <form className='row g-3' onSubmit={sendData}>
        <div className="col-md-6">
          <label htmlFor="nombres" className="form-label"style={{ color: "#100955" }}>
            Nombres:
          </label>
          <input
            type="text"
            id="nombres"
            className="form-control"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="apellidos" className="form-label"style={{ color: "#100955" }}>
            Apellidos:
          </label>
          <input
            type="text"
            id="apellidos"
            className="form-control"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="fecha_nacimiento" className="form-label"style={{ color: "#100955" }}>
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="fecha_nacimiento"
            className="form-control"
            value={fecha_nacimiento}
            onChange={(e) => setFecha_nacimiento(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="direccion" className="form-label"style={{ color: "#100955" }}>
            Dirección:
          </label>
          <input
            type="text"
            id="direccion"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ocupacion" className="form-label"style={{ color: "#100955" }}>
            Ocupación:
          </label>
          <input
            type="text"
            id="ocupacion"
            className="form-control"
            value={ocupacion}
            onChange={(e) => setOcupacion(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="organizacion" className="form-label"style={{ color: "#100955" }}>
            Institución:
          </label>
          <input
            type="text"
            id="organizacion"
            className="form-control"
            value={organizacion}
            onChange={(e) => setOrganizacion(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="correo" className="form-label"style={{ color: "#100955" }}>
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="clave" className="form-label"style={{ color: "#100955" }}>
            Clave:
          </label>
          <input
            type="password"
            id="clave"
            className="form-control"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary"style={{ backgroundColor: "#100955" }}>
            REGISTRARSE
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default Registro;
