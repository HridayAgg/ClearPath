import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker, useMap } from 'react-leaflet';
import { Wind, Navigation } from 'lucide-react';
import { generatePollutionZones } from '../../data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import L from 'leaflet';
const icon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div style='background-color: rgb(59, 130, 246); width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;'></div>",
  iconSize: [15, 15],
});

const userIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div style='background-color: #10B981; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;'></div>",
  iconSize: [15, 15],
});

interface RecenterMapProps {
  position: [number, number];
}

const RecenterMap: React.FC<RecenterMapProps> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
};

const AQIMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([51.505, -0.09]);
  const [pollutionZones, setPollutionZones] = useState<any[]>([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(newLocation);
        setPollutionZones(generatePollutionZones(newLocation));
      });
    }
  }, []);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981';
    if (aqi <= 100) return '#F59E0B';
    if (aqi <= 150) return '#F97316';
    if (aqi <= 200) return '#EF4444';
    return '#7F1D1D';
  };

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={userLocation}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap position={userLocation} />
        
        {/* User Location Marker */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="p-2">
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-green-500" />
                <span className="font-semibold">Your Location</span>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Pollution Zones */}
        {pollutionZones.map((zone, index) => (
          <Circle
            key={index}
            center={zone.coordinates}
            radius={500}
            pathOptions={{
              color: getAQIColor(zone.aqi),
              fillColor: getAQIColor(zone.aqi),
              fillOpacity: 0.3,
            }}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <h3 className="font-semibold">AQI: {zone.aqi}</h3>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p>PM2.5: {zone.pollutants.pm25} µg/m³</p>
                  <p>PM10: {zone.pollutants.pm10} µg/m³</p>
                  <p>NO₂: {zone.pollutants.no2} ppb</p>
                  <p>SO₂: {zone.pollutants.so2} ppb</p>
                  <p>CO: {zone.pollutants.co} ppm</p>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default AQIMap;