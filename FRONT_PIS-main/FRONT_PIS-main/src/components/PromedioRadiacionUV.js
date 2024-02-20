// PromedioRadiacionUV.jsx
import React from 'react';
import './css/PromedioRadiacionUV.css';

const PromedioRadiacionUV = ({ averageIntensity }) => {
  return (
    <div className="promedio-radiacion-uv">
      <h2 className="text-center mb-4">Radiación UV</h2>
      <p className="text-center">Promedio: {averageIntensity.toFixed(2)}</p>
    </div>
  );
};

export default PromedioRadiacionUV;

