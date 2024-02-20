import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import UVMap from '../components/UVMap';
import UVInfo from '../components/UVInfo';
import UVLegend from '../components/UVLegend';
import UVBarra from '../components/UVBarra';
import PromedioRadiacionUV from '../components/PromedioRadiacionUV';
import ListaComentario from './ListaComentarios';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/InicioSesion.css';
import '../components/css/Radiacion.css';
import verdeImg from '../components/imagenes/1verde-02.png';
import amarilloImg from '../components/imagenes/2amarillo-02.png';
import naranjaImg from '../components/imagenes/3naranja-02.png';
import rojoImg from '../components/imagenes/4rojo-02.png';
import moradoImg from '../components/imagenes/5morado-02.png';


const Radiacion = () => {
  const [uvData, setUVData] = useState({
    intensity: 0,
    location: 'Loja, Ecuador',
    selectedDevice: null,
    devices: [],
    totalActiveDevices: 0,
    averageIntensity: 0
  });

  const [uvHistory, setUVHistory] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('https://computacion.unl.edu.ec/uv/api/medicionDispositivos');
        const dispositivos = response.data.ultimasMediciones.map(dispositivo => ({
          nombre: dispositivo.nombre,
          latitud: dispositivo.latitud,
          longitud: dispositivo.longitud,
          external_id: dispositivo.external_id,
          uv: dispositivo.medicions.length > 0 ? dispositivo.medicions[0].uv : null,
          activo: dispositivo.medicions.length > 0 ? dispositivo.medicions[0].uv !== 0 : false
        }));
        setUVData(prevState => ({
          ...prevState,
          devices: dispositivos
        }));

        // Calcular el promedio de la radiación UV
        const totalIntensity = dispositivos.reduce((acc, dispositivo) => acc + dispositivo.uv, 0);
        const averageIntensity = totalIntensity / dispositivos.length;
        setUVData(prevState => ({
          ...prevState,
          averageIntensity: averageIntensity
        }));
      } catch (error) {
        console.error('Error fetching devices data:', error);
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    if (uvData.selectedDevice) {
      fetchDeviceData();
    }
  }, [uvData.selectedDevice, lastUpdate]);

  const fetchDeviceData = async () => {
    try {
      if (uvData.selectedDevice) {
        const response = await axios.get(`https://computacion.unl.edu.ec/uv/api/medicionDispositivos`);
        const dispositivoActualizado = response.data.ultimasMediciones.find(dispositivo => dispositivo.external_id === uvData.selectedDevice.external_id);
        if (dispositivoActualizado && dispositivoActualizado.medicions.length > 0) {
          const nuevoDato = {
            uv: dispositivoActualizado.medicions[0].uv,
            fecha: dispositivoActualizado.medicions[0].fecha
          };
          if (dispositivoActualizado.medicions[0].fecha !== lastUpdate) {
            setUVHistory(prevHistory => [...prevHistory, nuevoDato]);
            setLastUpdate(dispositivoActualizado.medicions[0].fecha);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  const handleDeviceSelect = device => {
    setUVData(prevState => ({
      ...prevState,
      selectedDevice: device,
      intensity: device.uv
    }));
    setUVHistory([]);
    setLastUpdate(null);
  };

  const clearHistory = () => {
    setUVHistory([]);
  };

  const limitedHistory = uvHistory.slice(-15);

  const seleccionarImagen = () => {
    if (uvData.averageIntensity >= 0 && uvData.averageIntensity < 3) {
      return <img src={verdeImg} alt="Imagen 1" style={{ width: 'auto', height: '600px' }} />;
    } else if (uvData.averageIntensity >= 3 && uvData.averageIntensity < 6) {
      return <img src={amarilloImg} alt="Imagen 2" style={{ width: 'auto', height: '600px' }} />;
    } else if (uvData.averageIntensity >= 6 && uvData.averageIntensity < 8) {
      return <img src={naranjaImg} alt="Imagen 3" style={{ width: 'auto', height: '600px' }} />;
    } else if (uvData.averageIntensity >= 8 && uvData.averageIntensity < 11) {
      return <img src={rojoImg} alt="Imagen 4" style={{ width: 'auto', height: '600px' }} />;
    } else if (uvData.averageIntensity >= 11 && uvData.averageIntensity <= 15) {
      return <img src={moradoImg} alt="Imagen 5" style={{ width: 'auto', height: '600px' }} />;
    } else {
      return null; // Puedes cambiar esto según tus necesidades
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-4" style={{ backgroundColor: 'white', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className='row'>
          <div className="order-md-first col-md-4 offset-md-2" style={{ textAlign: 'left', margin: '0' }}>
            <div className="section-container">
              <PromedioRadiacionUV averageIntensity={uvData.averageIntensity} />
              <div className='promedio-radiacion-uv'>
                {seleccionarImagen()}
              </div>

            </div>

          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className='w-100'>
            
            <div className="section-container">
            <h1 className="text-center" >ÍNDICE DE</h1> 
            <h1 className="text-center mb-5" >RADIACIÓN</h1> 
              <UVBarra uvIntensity={uvData.intensity} />
            </div>
            <div className="row mt-5">
              <div className="col-md-12 mb-2">
                <div className="section-container">
                  <h3 className="h3 mb-4" >Seleccionar Dispositivo</h3>
                  <select
                    className="form-select"
                    style={{ width: '75%', margin:'auto'}}
                    value={uvData.selectedDevice ? uvData.selectedDevice.external_id : ''}
                    onChange={e => {
                      const selectedDevice = uvData.devices.find(device => device.external_id === e.target.value);
                      handleDeviceSelect(selectedDevice);
                    }}
                  >
                    {uvData.devices
                      .filter(device => device.external_id)
                      .map(device => (
                        <option key={device.external_id} value={device.external_id}>
                          {device.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            </div>
        
          </div>
          <div className='col-md-4'>
            <div className="">
              <h2 className="text-center mb-4">Niveles UV</h2>
              <div className="col-md-8 offset-md-2">
                <div className="section-container">
                  <UVLegend uvIntensity={uvData.intensity}/>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-center mb-4">Información</h2>
              <div className="col-md-8 offset-md-2">
                <div className="section-container">
                  <UVMap selectedDevice={uvData.selectedDevice} />
                </div>
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="section-container">
                  <UVInfo uvIntensity={uvData.intensity} uvLocation={`${uvData.selectedDevice ? uvData.selectedDevice.nombre + ' - "Loja, ' : ''}Ecuador`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-container" style={{marginLeft: '250px', marginRight: '250px'}}>
          <ListaComentario/>
        </div>

        <Footer />
      </div>

    </>

  );
};

export default Radiacion;