import React, { useState, useEffect } from 'react';
import '../components/css/Comentario.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { obtener, enviar } from '../hooks/Conexion';
import '../components/css/Radiacion.css'

const Comentario = () => {
  // Data de comentarios
  function formatFecha(fecha) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString(undefined, options);
    return fechaFormateada;
  }

  const [comentarios, setComentarios] = useState([]);

  const obtenerComentarios = async () => {
    try {
      const response = await obtener('/comentario/list');
      const resultado = response.info;
      setComentarios(resultado);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  return (
    <>
      <div className="card" style={{marginTop: '100px'}}>
        <div className="px-4 chat-box bg-white rounded-lg">

            <h2 style={{color: '#100955', marginTop: '10px', marginBottom: '25px', fontWeight: 'bold' }}>COMENTARIOS</h2>

          <div>
            {comentarios.slice().reverse().map((comentario, index) => (
              <div key={index} className="media mb-3">
                <div className="">
                  <div role="alert" className="alert alert-success py-2 mb-2">
                    <p className="text-small mb-0 text-muted">comentario: {comentario.coment}</p>
                    <p className="text-small mb-0 text-muted">sentimiento: {comentario.sentimiento}</p>
                  </div>
                  <p className="small text-muted">creado por: {comentario.usuario} - {formatFecha(comentario.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  };
export default Comentario;
