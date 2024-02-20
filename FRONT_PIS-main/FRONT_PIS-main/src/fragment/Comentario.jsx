import React, { useState, useEffect } from 'react';
import '../components/css/Comentario.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { obtener, enviar } from '../hooks/Conexion';
import { getExternal } from '../utilidades/SessionUtilClient';
import mensajes from '../utilidades/Mensajes';

const Comentario = () => {
  // Data de comentarios
  function formatFecha(fecha) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString(undefined, options);
    return fechaFormateada;
  }

  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState('');
  const [emojiSeleccionado, setEmojiSeleccionado] = useState(null);
  const [error, setError] = useState('');

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


  //ENVIAR DATOS AL BACKEND
  const onSubmit = async (e) => {
    e.preventDefault();
      const external = getExternal();
      const datos = {
        comentario: comentario,
        external_persona: external,
      };

      try {
        const info = await enviar('/comentario/save', datos);

        if (info.code === 200) {
          mensajes("Comentario enviado!", "success", info.msg);
          obtenerComentarios();
          setComentario('');
          setEmojiSeleccionado(null); // Limpiar el emoji seleccionado después de enviar con éxito
        } else {
          setError(info.msg);
          mensajes("Error al comentar", "error", error);
        }
      } catch (error) {
        setError("Error al comentar");
        mensajes("Error al comentar", "error", error.message);
      }
  };
  return (
    <>
      <div className="card">
        <div className="px-4 chat-box bg-white rounded-lg">
          <div className="p-4 row text-center">
            <h2>AÑADIR UN COMENTARIO</h2>
          </div>
  
          <div className="text-center">
            <form onSubmit={onSubmit} className="transparent">
              <div className="input-group" style={{ width: '100%' }}>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  aria-describedby="button-addon2"
                  className="form-control border-1 alert alert-info p-2"
                  style={{
                    backgroundColor: 'transparent',
                    height: '40px',
                    overflowY: comentario.length > 50 ? 'scroll' : 'hidden',
                  }}
                ></textarea>
                <div className="input-group-append alert alert-info" style={{ height: '40px', margin: '0', padding: '0' }}>
                  <button type="submit" className="btn btn-link">
                    <i className="fa fa-paper-plane" style={{ width: "25", height: "25" }}></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
  
          <div>
            <p>Comentarios</p>
            {/* Mapear los comentarios */}
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
