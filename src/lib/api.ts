import axios from 'axios';


// OpenWeatherMap API for AQI data
const WEATHER_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key
const WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';

// TomTom API for traffic data
const TOMTOM_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key
const TOMTOM_BASE_URL = 'https://api.tomtom.com/traffic/services/4';

export const getAirQualityData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${WEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};

export const getTrafficIncidents = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${TOMTOM_BASE_URL}/incidentDetails?key=${TOMTOM_API_KEY}&bbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}&fields={incidents{type,geometry,properties}}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching traffic incidents:', error);
    return null;
  }
};

// Mock transit API (replace with actual transit API when available)
export const getTransitSchedule = async () => {
  return {
    buses: [
      { id: '101', route: 'Downtown Express', nextArrival: '5 min' },
      { id: '102', route: 'Airport Shuttle', nextArrival: '12 min' },
    ],
    metro: [
      { id: 'M1', line: 'Blue Line', nextArrival: '3 min' },
      { id: 'M2', line: 'Red Line', nextArrival: '7 min' },
    ],
  };
};