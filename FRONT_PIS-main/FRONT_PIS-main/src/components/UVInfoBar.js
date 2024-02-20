// UVInfoBar.js
import React from 'react';

const UVInfoBar = ({ uvIntensity }) => {
  const uvLevels = [
    { level: 'Bajo', color: 'green' },
    { level: 'Moderado', color: 'yellow' },
    { level: 'Alto', color: 'orange' },
    { level: 'Muy Alto', color: 'red' },
    { level: 'Extremo', color: 'purple' },
  ];

  const getBarColor = (intensity) => {
    if (intensity < 3) {
      return uvLevels[0].color;
    } else if (intensity < 6) {
      return uvLevels[1].color;
    } else if (intensity < 8) {
      return uvLevels[2].color;
    } else if (intensity < 11) {
      return uvLevels[3].color;
    } else {
      return uvLevels[4].color;
    }
  };

  const barColor = getBarColor(uvIntensity);

  return (
    <div className="uv-info-bar">
      <div className="uv-bar-container">
        {uvLevels.map((level) => (
          <div key={level.level} className={`uv-color-indicator ${level.color}`}></div>
        ))}
        <div className={`uv-indicator ${barColor}`} style={{ top: `calc(${(uvIntensity - 1) * 20}% - 10px)` }}></div>
      </div>
      <p className="mb-0 ml-2" style={{ color: '#000000' }}>Intensidad UV: {uvIntensity}</p>
    </div>
  );
};

export default UVInfoBar;
