import React, { useState, useEffect } from 'react';
import '../components/css/UVLegend.css';

const UVLegend = ({ uvIntensity }) => {
  const uvLevels = [
    {
      level: 'Bajo - Menor a 2',
      recommendation: 'Se puede disfrutar al aire libre con precauciones normales.',
      color: 'uv-low',
    },
    {
      level: 'Moderado - 3 a 5',
      recommendation: 'Se recomienda protección solar. Puedes disfrutar del aire libre, pero evita largas exposiciones al sol.',
      color: 'uv-moderate',
    },
    {
      level: 'Alto - 6 a 7',
      recommendation: 'Usa protector solar, sombrero y gafas de sol. Limita el tiempo al sol, especialmente durante las horas pico.',
      color: 'uv-high',
    },
    {
      level: 'Muy Alto - 8 a 10',
      recommendation: 'Evita la exposición prolongada al sol. Usa ropa protectora y busca sombra.',
      color: 'uv-very-high',
    },
    {
      level: 'Extremo - 11+',
      recommendation: '¡Advertencia! Se requiere máxima protección solar. Limita al máximo la exposición directa al sol.',
      color: 'uv-extreme',
    },
  ];

  const [currentLevel, setCurrentLevel] = useState(0);

  /**useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLevel((prevLevel) => (prevLevel + 1) % uvLevels.length);
    }, 3000);*/
    useEffect(() => {
      // Lógica para cambiar el nivel automáticamente según el prop uvIntensity
      if (uvIntensity < 2) setCurrentLevel(0);
      else if (uvIntensity >= 3 && uvIntensity <= 5) setCurrentLevel(1);
      else if (uvIntensity >= 6 && uvIntensity <= 7) setCurrentLevel(2);
      else if (uvIntensity >= 8 && uvIntensity <= 10) setCurrentLevel(3);
      else setCurrentLevel(4);
    }, [uvIntensity]);
  
    const uvLevelClass = uvLevels[currentLevel].color;

    return (
      <div className={`uv-legend ${uvLevelClass}`}>
        <h3><center>A tener en cuenta</center></h3>
        <div className="legend-item">
          <div className={` ${uvLevelClass}`}></div>
          <div className="legend-text">
            {uvLevels[currentLevel].level}
            <p>{uvLevels[currentLevel].recommendation}</p>
          </div>
        </div>
      </div>
    );
};

export default UVLegend;
