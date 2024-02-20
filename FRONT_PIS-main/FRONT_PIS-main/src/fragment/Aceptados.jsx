import React, { useState, useEffect } from 'react';
import { obtener } from '../hooks/Conexion';
import Navbar from './Navbar';
import '../components/css/InicioSesion.css';
import Footer from './Footer';

function Aceptados() {
  const [usuarios, setUsuarios] = useState([]);
  //LISTA DE USUARIOS ACEPTADOS
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await obtener('/persona/listaAceptado');
        const resultado = response.info;
        setUsuarios(resultado);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerUsuarios();
  }, []);

  return (
    <>
      <Navbar />
      <div className="row">
        <figure className="text-center" style={{ padding: '20px' }}>
          <h1 style={{ color: "#100955", fontSize: '50px' }}>LISTA DE USUARIOS ACEPTADOS</h1>
        </figure>
        <div className="container-fluid" style={{ padding: '20px 150px' }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="table-header">Nro</th>
                <th className="table-header">Apellidos</th>
                <th className="table-header">Nombres</th>
                <th className="table-header">Dirección</th>
                <th className="table-header">Fecha de Nacimiento</th>
                <th className="table-header">Ocupación</th>
                <th className="table-header">Organización</th>
                <th className="table-header">Correo</th>
                <th className="table-header">Estado</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.nombres}</td>
                  <td>{usuario.direccion}</td>
                  <td>{new Date(usuario.fecha_nacimiento).toLocaleDateString()}</td>
                  <td>{usuario.ocupacion}</td>
                  <td>{usuario.organizacion}</td>
                  <td>{usuario.cuenta.correo}</td>
                  <td>{usuario.cuenta.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Aceptados;
