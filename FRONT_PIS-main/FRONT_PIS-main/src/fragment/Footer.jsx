// Footer.jsx
import React from 'react';
import '../components/css/Footer.css';
import unlImage from '../components/imagenes/UNL3.png';

const Footer = () => (
  <div className="footer">
    <img src={unlImage} alt="UNL Logo" className="unl-logo" />
    UNIVERSIDAD NACIONAL DE LOJA
    <img src={unlImage} alt="UNL Logo" className="unl-logo" />
  </div>
);

export default Footer;