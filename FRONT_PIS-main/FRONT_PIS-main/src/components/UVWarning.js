import React from 'react';

const UVWarning = ({ uvIntensity }) => {
  let warningMessage = null;
  let warningClass = '';

  if (uvIntensity >= 0 && uvIntensity < 3) {
    warningMessage = 'Nivel bajo de radiación UV. Precaución mínima requerida.';
    warningClass = 'low';
  } else if (uvIntensity >= 3 && uvIntensity < 6) {
    warningMessage = 'Nivel moderado de radiación UV. Tomar precauciones.';
    warningClass = 'moderate';
  } else if (uvIntensity >= 6 && uvIntensity < 8) {
    warningMessage = 'Nivel alto de radiación UV. Se recomienda protección solar.';
    warningClass = 'high';
  } else if (uvIntensity >= 8 && uvIntensity < 11) {
    warningMessage = 'Nivel muy alto de radiación UV. Se requiere protección solar.';
    warningClass = 'very-high';
  } else if (uvIntensity >= 11) {
    warningMessage = '¡Advertencia! Nivel crítico de radiación UV. Extrema precaución requerida.';
    warningClass = 'extreme';
  }

  return <div className={`uv-warning ${warningClass}`}>{warningMessage}</div>;
};

export default UVWarning;
