import React from 'react';

const UVBar = ({ uvIntensity }) => {
  const determineColor = (intensity) => {
    if (intensity < 3) {
      return 'green';
    } else if (intensity < 6) {
      return 'yellow';
    } else if (intensity < 8) {
      return 'orange';
    } else if (intensity < 11) {
      return 'red';
    } else {
      return 'purple';
    }
  };

  const color = determineColor(uvIntensity);

  // Calcula el ancho de la barra en función del nivel de intensidad
  const barWidth = `${Math.min((uvIntensity / 12) * 100, 100)}%`;

  return (
    <div className="uv-bar">
      <p className="mb-3" style={{ color: '#000000' }}>Intensidad UV: {uvIntensity}</p>
      {/* Aplica el ancho dinámico a la barra indicadora */}
      <div className={`uv-bar-indicator uv-color-indicator ${color}`} style={{ width: barWidth }}></div>
    </div>
  );
};

export default UVBar;
