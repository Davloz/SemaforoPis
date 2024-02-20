import React, { useState, useEffect } from 'react';
import { obtener, enviar } from '../hooks/Conexion';
import Navbar from './Navbar';
import mensajes from '../utilidades/Mensajes';
import '../components/css/InicioSesion.css';
import Footer from './Footer';

function RegistrosUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await obtener('/persona/listaEspera');
        const resultado = response.info;
        setUsuarios(resultado);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerUsuarios();
  }, []);

  //METODO DE CAMBIO DE ESTADO
  const handleCambiarEstado = async (externalId, nuevoEstado) => {
    try {
      const data = {
        external_id: externalId,
        estado: nuevoEstado,
      };
      // Ajusta la URL según tu implementación real
      await enviar('/cuenta/modEstado', data).then((info) => {
        if (info.code === 200) {
          mensajes("estado actualizado!", "success", info.msg);
          const nuevosUsuarios = usuarios.map((usuario) =>
            usuario.cuenta.external_id === externalId
              ? { ...usuario, cuenta: { ...usuario.cuenta, estado: nuevoEstado } }
              : usuario
          );
          setUsuarios(nuevosUsuarios);
        } else {
          mensajes("Error al cambiar estado", "error", info.msg);
        }
      });
      // Actualizar la lista de usuarios después de cambiar el estado
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <figure className="text-center" style={{ padding: '20px' }}>
          <h1 style={{ color: "#100955", fontSize: '50px', fontWeight: 'bold' }}>LISTA DE USUARIOS EN ESPERA</h1>
        </figure>
        <div className="container-fluid" style={{ padding: '20px 150px' }}>
          <div className="table-container">
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
                  <th className="table-header">Acciones</th>
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
                    <td className="text-center">
                      <button
                        className="btn btn-success"
                        style={{ marginRight: '8px' }}
                        onClick={() => handleCambiarEstado(usuario.cuenta.external_id, 'ACEPTADO')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginRight: '8px' }}
                        onClick={() => handleCambiarEstado(usuario.cuenta.external_id, 'RECHAZADO')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                          <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegistrosUsuario;
