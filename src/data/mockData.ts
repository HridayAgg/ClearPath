import type { TrafficAlert, EnvironmentalAlert, InfrastructureUpdate, AQIReading } from '../types';

// Random coordinates around a center point
const generateRandomCoord = (center: [number, number], radiusKm: number = 2) => {
  const lat = center[0] + (Math.random() - 0.5) * (radiusKm * 0.018);
  const lng = center[1] + (Math.random() - 0.5) * (radiusKm * 0.018);
  return [lat, lng] as [number, number];
};

export const generateTrafficZones = (center: [number, number]): Array<{
  coordinates: [number, number];
  intensity: number;
  type: 'heavy' | 'moderate' | 'light';
}> => {
  return Array.from({ length: 8 }, () => ({
    coordinates: generateRandomCoord(center),
    intensity: Math.floor(Math.random() * 100),
    type: Math.random() > 0.7 ? 'heavy' : Math.random() > 0.4 ? 'moderate' : 'light',
  }));
};

export const generatePollutionZones = (center: [number, number]): Array<{
  coordinates: [number, number];
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
  };
}> => {
  return Array.from({ length: 6 }, () => ({
    coordinates: generateRandomCoord(center),
    aqi: Math.floor(Math.random() * 300),
    pollutants: {
      pm25: Math.floor(Math.random() * 100),
      pm10: Math.floor(Math.random() * 150),
      no2: Math.floor(Math.random() * 100),
      so2: Math.floor(Math.random() * 50),
      co: Math.floor(Math.random() * 10),
    },
  }));
};

export const trafficAlerts: TrafficAlert[] = [
  {
    id: '1',
    title: 'Heavy Traffic Congestion',
    location: 'Downtown Main Street',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    description: 'Major delays due to multiple lane closures',
  },
  {
    id: '2',
    title: 'Road Construction',
    location: 'West Boulevard',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    description: 'Single lane operation causing moderate delays',
  },
  {
    id: '3',
    title: 'Accident Cleared',
    location: 'Highway 101 North',
    severity: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    description: 'All lanes now open, residual delays expected',
  },
  {
    id: '4',
    title: 'Special Event Traffic',
    location: 'Convention Center',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    description: 'Increased traffic due to ongoing convention',
  },
  {
    id: '5',
    title: 'Bridge Maintenance',
    location: 'River Bridge',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
    description: 'Periodic closures for routine maintenance',
  },
  {
    id: '6',
    title: 'Weather Impact',
    location: 'Coastal Highway',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    description: 'Heavy rain causing reduced visibility and slower traffic',
  },
];

export const environmentalAlerts: EnvironmentalAlert[] = [
  {
    id: '1',
    title: 'Poor Air Quality Warning',
    location: 'Industrial District',
    level: 'severe',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    description: 'High levels of PM2.5 detected. Wear masks recommended.',
  },
  {
    id: '2',
    title: 'Ozone Alert',
    location: 'City Center',
    level: 'moderate',
    timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    description: 'Elevated ozone levels during peak hours.',
  },
  {
    id: '3',
    title: 'Smoke Advisory',
    location: 'North District',
    level: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    description: 'Reduced visibility due to industrial activity.',
  },
  {
    id: '4',
    title: 'Air Quality Improvement',
    location: 'South District',
    level: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    description: 'Air quality returning to normal levels.',
  },
  {
    id: '5',
    title: 'Dust Storm Warning',
    location: 'East District',
    level: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
    description: 'High winds causing elevated particle levels.',
  },
];

export const infrastructureUpdates: InfrastructureUpdate[] = [
  {
    id: '1',
    title: 'Road Resurfacing',
    location: 'Oak Street',
    status: 'in-progress',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: 'Ongoing road maintenance work.',
    estimatedCompletion: '2024-02-25',
  },
  {
    id: '2',
    title: 'Traffic Light Installation',
    location: 'Maple Avenue',
    status: 'scheduled',
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    description: 'New traffic signal installation.',
    estimatedCompletion: '2024-03-01',
  },
  {
    id: '3',
    title: 'Bridge Inspection',
    location: 'River Bridge',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    description: 'Routine structural inspection completed.',
    estimatedCompletion: '2024-02-20',
  },
  {
    id: '4',
    title: 'Sidewalk Repairs',
    location: 'Downtown Area',
    status: 'in-progress',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    description: 'Ongoing pedestrian infrastructure improvements.',
    estimatedCompletion: '2024-03-15',
  },
];

export const generateAQIData = (): AQIReading => ({
  timestamp: new Date().toISOString(),
  value: Math.floor(Math.random() * 300),
  pollutants: {
    pm25: Math.floor(Math.random() * 100),
    pm10: Math.floor(Math.random() * 150),
    no2: Math.floor(Math.random() * 100),
    so2: Math.floor(Math.random() * 50),
    co: Math.floor(Math.random() * 10),
    o3: Math.floor(Math.random() * 100),
  },
  status: 'real-time',
  recommendations: [
    'Wear masks when outdoors',
    'Limit outdoor activities',
    'Keep windows closed',
  ],
});