export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  points: number;
  createdAt: string;
}

export interface TrafficData {
  id: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  density: number;
  speed: number;
}

export interface TransportSchedule {
  id: string;
  type: 'bus' | 'metro';
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  schedule: {
    departureTime: string;
    arrivalTime: string;
    frequency: number; // in minutes
  }[];
  status: 'on-time' | 'delayed' | 'cancelled';
}

export interface PollutionData {
  id: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    o3: number;
    co: number;
  };
  alert?: {
    level: 'low' | 'moderate' | 'high' | 'severe';
    message: string;
    recommendations: string[];
  };
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  sponsor: {
    name: string;
    logo: string;
  };
  validUntil: string;
}

export interface TrafficAlert {
  id: string;
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  description: string;
}

export interface EnvironmentalAlert {
  id: string;
  title: string;
  location: string;
  level: 'low' | 'moderate' | 'high' | 'severe';
  timestamp: string;
  description: string;
}

export interface InfrastructureUpdate {
  id: string;
  title: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  timestamp: string;
  description: string;
  estimatedCompletion: string;
}

export interface AQIReading {
  timestamp: string;
  value: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
    o3: number;
  };
  status: 'real-time' | 'forecast';
  recommendations: string[];
}

export interface Feedback {
  id: string;
  userId: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  issueType: 'TRAFFIC' | 'POLLUTION' | 'INFRASTRUCTURE' | 'CONSTRUCTION' | 'POTHOLE' | 'STREETLIGHT' | 'DUMPING';
  description: string;
  timestamp: string;
  status: 'PENDING' | 'IN_REVIEW' | 'RESOLVED';
  pointsAwarded: number;
  images?: string[];
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  rank: number;
  contributionCount: number;
}