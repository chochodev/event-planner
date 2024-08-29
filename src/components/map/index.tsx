import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for leaflet's default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationSelector = ({ lat, lng, setLat, setLng }) => {
  const [position, setPosition] = useState([lat, lng]);
  const [mapCenter, setMapCenter] = useState([lat, lng]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's current position:", latitude, longitude);
          setMapCenter([latitude, longitude]);
          setLat(latitude);
          setLng(longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [setLat, setLng]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <div className='relative z-[1] h-[18.75rem] w-full '>
      {loading ? (
        <div className="flex flex-col gap-[0.5rem] items-center justify-center h-full">
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          <p className="text-[0.75rem] text-center text-orange-500">Allow location access to add the map to your event.</p>
        </div>
      ) : (
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
        </MapContainer>
      )}
    </div>
  );
};

export default LocationSelector;
