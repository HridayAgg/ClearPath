import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { AlertTriangle, Navigation } from 'lucide-react';
import { generateTrafficZones } from '../../data/mockData';
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

const TrafficMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([51.505, -0.09]);
  const [trafficZones, setTrafficZones] = useState<any[]>([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(newLocation);
        setTrafficZones(generateTrafficZones(newLocation));
      });
    }
  }, []);

  const getTrafficColor = (type: string) => {
    switch (type) {
      case 'heavy':
        return '#EF4444';
      case 'moderate':
        return '#F59E0B';
      case 'light':
        return '#10B981';
      default:
        return '#10B981';
    }
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

        {/* Traffic Zones */}
        {trafficZones.map((zone, index) => (
          <React.Fragment key={index}>
            <Circle
              center={zone.coordinates}
              radius={300}
              pathOptions={{
                color: getTrafficColor(zone.type),
                fillColor: getTrafficColor(zone.type),
                fillOpacity: 0.3,
              }}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <h3 className="font-semibold">Traffic {zone.type}</h3>
                  </div>
                  <p className="text-sm mt-1">
                    Traffic intensity: {zone.intensity}%
                  </p>
                </div>
              </Popup>
            </Circle>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;