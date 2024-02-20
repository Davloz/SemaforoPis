import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './fragment/InicioSesion';
import Registro from './fragment/Registro';
import Radiacion from './fragment/Radiacion';
import Comentario from './fragment/Comentario';
import Api from './fragment/Api';
import RegistrosUsuario from './fragment/RegistrosUsuario';
import Aceptados from './fragment/Aceptados';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Radiacion/>} />
          <Route path='/inicio-sesion' element={<InicioSesion />} />
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/comentarios' element={<Comentario/>}/>
          <Route path='/api' element={<Api/>}/>
          <Route path='/validacion-usuarios' element={<RegistrosUsuario/>}/>
          <Route path='/usuarios-aceptados' element={<Aceptados/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

