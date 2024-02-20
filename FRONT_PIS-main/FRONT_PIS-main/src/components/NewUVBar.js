// NewUVBar.js
import React from 'react';
import '../components/css/NewUVBar.css';

const NewUVBar = () => {
  // Definir los colores correspondientes a cada nivel
  const uvLevels = [
    { level: 5, color: 'purple', label: 'Extremadamente Alto', range: '11+' },
    { level: 4, color: 'red', label: 'Muy Alto', range: '8-10' },
    { level: 3, color: 'orange', label: 'Alto', range: '6-7' },
    { level: 2, color: 'yellow', label: 'Moderado', range: '3-5' },
    { level: 1, color: 'green', label: 'Bajo', range: '0-2' },
  ];

  return (
    <div className="new-uv-bar-container">
      <div className="new-uv-bar">
        {uvLevels.map((level) => (
          <div
            key={level.level}
            className="uv-level"
            style={{ backgroundColor: level.color }}
          >
            <span className="uv-level-range">{level.range}</span>
          </div>
        ))}
      </div>
      <div className="uv-level-info">
        {uvLevels.map((level) => (
          <div key={level.level} className="uv-info-item">
            <div

            ></div>
            <div className="uv-level-label">{level.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewUVBar;
