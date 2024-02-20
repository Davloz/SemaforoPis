import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import uvSensorIcon from './imagenes/apuntador.png'; // Importa la imagen del marcador

const UVMap = ({ selectedDevice }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Configuración básica del mapa
      const map = L.map('map').setView([-3.9903, -79.2044], 13); // Coordenadas iniciales
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      mapRef.current = map;
    }

    // Actualiza la posición del marcador cuando se selecciona un dispositivo
 if (selectedDevice) {
  const { latitud, longitud } = selectedDevice;
  if (!markerRef.current) {
    markerRef.current = L.marker([latitud, longitud]).addTo(mapRef.current);
    markerRef.current.setIcon(L.icon({
      iconUrl: uvSensorIcon,
      iconSize: [32, 32], // Tamaño de la imagen del marcador
      iconAnchor: [16, 32], // Punto de anclaje del marcador
    }));
    mapRef.current.setView([latitud, longitud], 13); // Centra el mapa en la ubicación del marcador con un nivel de zoom de 13
  } else {
    markerRef.current.setLatLng([latitud, longitud]);
    mapRef.current.setView([latitud, longitud]); // Centra el mapa en la nueva ubicación del marcador
  }
}

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [selectedDevice]);

  return <div id="map" style={{ minHeight: '350px', border: '1px solid #ccc' }}></div>;
};

export default UVMap;

