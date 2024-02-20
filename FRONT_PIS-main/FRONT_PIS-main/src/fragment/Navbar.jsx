import React, { useState } from 'react';
import { borrarSesion } from '../utilidades/SessionUtil';
import { getRol } from '../utilidades/SessionUtilClient';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import Comentario from './Comentario';
import '../components/css/Comentario.css';
import '../components/css/Navbar.css';
import { BiHouse } from 'react-icons/bi';  

const Navbar = () => {
  const navigate = useNavigate();
  const rol = getRol();

  const [showComentariosModal, setShowComentariosModal] = useState(false);

  const handleCerrarSesion = () => {
    borrarSesion();
    navigate('/inicio-sesion');
  };

  const sesionIniciada = rol !== null; // Verifica si la sesión está iniciada

  const handleAbrirComentariosModal = () => {
    setShowComentariosModal(true);
  };

  const handleCerrarComentariosModal = () => {
    setShowComentariosModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom bg-dark larger-text">
      <div className="container-fluid navbar-custom">
      <div className="brand-container larger-text">
          <a className="navbar-brand larger-text" href="/">
            P<img src="https://cdn-icons-png.flaticon.com/128/4215/4215517.png" alt="icono" className="icon-in-o" />LARIS
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {rol === 'ADMINISTRADOR' && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_home_house_12608.png"alt="icono" className="icon-in-o"></img>  HOME  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/validacion-usuarios">
                  <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_users_customers_clients_people_12438.png"alt="icono" className="icon-in-o"></img>  Validacion usuarios  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/api">
                  <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_copy_paste_12539.png"alt="icono" className="icon-in-o"></img>  Api  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/usuarios-aceptados">
                  <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_accept_ok_apply_12418.png"alt="icono" className="icon-in-o"></img>  Usuarios Aceptados  </a>
                </li>
              </>
            )}
            {rol === 'USUARIO' && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_home_house_12608.png"alt="icono" className="icon-in-o"></img>  HOME  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/api">
                  <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_copy_paste_12539.png"alt="icono" className="icon-in-o"></img>  Api  </a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={handleAbrirComentariosModal}>
                <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/bluequestion_azu_12470.png"alt="icono" className="icon-in-o"></img>  Añadir Comentario  </a>
                </li>
              </>
            )}
            {!sesionIniciada && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_home_house_12608.png"alt="icono" className="icon-in-o"></img>  HOME  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/inicio-sesion">
                  <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/blue_user_client_person_12581.png"alt="icono" className="icon-in-o"></img>  Inicio Sesion  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/registro">
                  <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/bluepen_azul__12511.png"alt="icono" className="icon-in-o"></img>  Registro  </a>
                </li>
              </>
            )}
          </ul>
          {sesionIniciada && (
            <span className="navbar-text">
              <a className="nav-link" href="/inicio-sesion" onClick={handleCerrarSesion}>
              <img src= "https://cdn.icon-icons.com/icons2/62/PNG/96/bluearrowright_azul_flech_12476.png"alt="icono" className="icon-in-o"></img>  Cerrar sesión</a>
            </span>
          )}
        </div>
      </div>
      <Modal show={showComentariosModal} 
      onHide={handleCerrarComentariosModal}
      dialogClassName="custom-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Comentario></Comentario>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarComentariosModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
