import React from 'react';
import './css/UVBarra.css';

const UVBarra = ({ uvIntensity }) => {
  // Calcula el ángulo de llenado de la barra según el nivel de UV, asegurándonos de que sea mínimo 0
  const fillAngle = Math.min((uvIntensity / 20) * 180, 180);


  // Asigna colores según el rango de intensidad
  let barColor;
  if (uvIntensity >= 0 && uvIntensity <= 2) {
    barColor = '#28a745'; // Verde
  } else if (uvIntensity <= 5) {
    barColor = '#ffc107'; // Amarillo
  } else if (uvIntensity <= 7) {
    barColor = '#fd7e14'; // Naranja
  } else if (uvIntensity <= 10) {
    barColor = '#dc3545'; // Rojo
  } else {
    barColor = '#6610f2'; // Morado
  }

  return (
    <div className="uv-barra-container">
      <svg viewBox="0 0 100 50" className="uv-barra-svg">
        {/* Dibuja la porción gris de la barra */}
        <path
          fill="none"
          stroke="#CCCCCC" // Color gris claro
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={`M 10,50 A 40,40 0 0,1 90,50`}
        />
        {/* Dibuja la porción de la barra con el color correspondiente al nivel de UV, pero solo si el nivel es mayor que 0 */}
        {uvIntensity > 0 && (
          <path
            fill="none"
            stroke={barColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M 10,50 A 40,40 0 0,1 90,50`}
            strokeDasharray={`${fillAngle}, 999`}
          />
        )}
      </svg>
      <div className="uv-barra-reading" style={{ fontSize: 100 }}>
  {uvIntensity.toFixed(2)}
</div>



    </div>
  );
};

export default UVBarra;
