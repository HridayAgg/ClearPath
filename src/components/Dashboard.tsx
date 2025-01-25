import React, { useState, useEffect } from 'react';
import { Activity, Wind, AlertTriangle, MapPin, Construction, AlertCircle, TrendingUp, Users, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AQIMap from './features/AQIMap';
import TrafficMap from './features/TrafficMap';
import AlertsModal from './modals/AlertsModal';
import { generateAQIData, trafficAlerts, environmentalAlerts, infrastructureUpdates } from '../data/mockData';
import type { AQIReading } from '../types';

const Dashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [aqiData, setAqiData] = useState<AQIReading | null>(null);
  const [trafficDensity, setTrafficDensity] = useState(75);
  const [showTrafficAlerts, setShowTrafficAlerts] = useState(false);
  const [showEnvAlerts, setShowEnvAlerts] = useState(false);
  const [showInfraAlerts, setShowInfraAlerts] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setAqiData(generateAQIData());
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const getAQIColor = (value: number) => {
    if (value <= 50) return 'text-green-600';
    if (value <= 100) return 'text-yellow-600';
    if (value <= 150) return 'text-orange-600';
    return 'text-red-600';
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor, onClick }: any) => (
    <div
      className={`glass-effect rounded-xl shadow-lg p-6 card-hover cursor-pointer ${
        hoveredCard === title ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className={`p-2 rounded-full ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <div className={`text-3xl font-bold ${textColor} animate-float`}>{value}</div>
      <p className="text-sm text-gray-600 mt-2">Current city-wide average</p>
      {hoveredCard === title && (
        <div className={`flex items-center mt-4 text-sm font-medium ${color} group`}>
          View Details
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-city-pattern py-6">
      <div className="container mx-auto px-4 space-y-6">
        <header className="glass-effect mb-8 p-6 rounded-xl animate-float">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-100 rounded-lg animate-pulse-ring">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ClearPath Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time insights for smarter urban planning</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Traffic Density"
            value={`${trafficDensity}%`}
            icon={Activity}
            color="text-cyan-600"
            bgColor="bg-cyan-100"
            textColor="text-cyan-700"
          />
          <StatCard
            title="Air Quality"
            value={aqiData ? `${aqiData.value} AQI` : 'Loading...'}
            icon={Wind}
            color="text-emerald-600"
            bgColor="bg-emerald-100"
            textColor={aqiData ? getAQIColor(aqiData.value) : 'text-emerald-700'}
          />
          <StatCard
            title="Active Alerts"
            value={trafficAlerts.length + environmentalAlerts.length + infrastructureUpdates.length}
            icon={AlertTriangle}
            color="text-rose-600"
            bgColor="bg-rose-100"
            textColor="text-rose-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="glass-effect rounded-xl shadow-lg p-6 card-hover">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-fuchsia-100 rounded-lg">
                <MapPin className="h-5 w-5 text-fuchsia-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Traffic Map</h3>
            </div>
            <div className="h-[400px]">
              <TrafficMap />
            </div>
          </div>

          <div className="glass-effect rounded-xl shadow-lg p-6 card-hover">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Wind className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pollution Map</h3>
            </div>
            <div className="h-[400px]">
              <AQIMap />
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Alerts */}
          <div className="glass-effect rounded-xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Traffic Alerts</h3>
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <div className="space-y-4">
              {trafficAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm font-medium text-orange-800">{alert.title}</div>
                  <div className="text-sm text-orange-600">{alert.location} - {new Date(alert.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
              <button
                onClick={() => setShowTrafficAlerts(true)}
                className="w-full text-sm text-gray-600 hover:text-gray-900 mt-2"
              >
                View All Alerts
              </button>
            </div>
          </div>

          {/* Environmental Alerts */}
          <div className="glass-effect rounded-xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Environmental Alerts</h3>
              <Wind className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-4">
              {environmentalAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">{alert.title}</div>
                  <div className="text-sm text-green-600">{alert.location} - {new Date(alert.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
              <button
                onClick={() => setShowEnvAlerts(true)}
                className="w-full text-sm text-gray-600 hover:text-gray-900 mt-2"
              >
                View All Alerts
              </button>
            </div>
          </div>

          {/* Infrastructure Updates */}
          <div className="glass-effect rounded-xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Infrastructure Updates</h3>
              <Construction className="h-6 w-6 text-purple-500" />
            </div>
            <div className="space-y-4">
              {infrastructureUpdates.slice(0, 4).map((update) => (
                <div key={update.id} className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-purple-800">{update.title}</div>
                  <div className="text-sm text-purple-600">{update.location} - {update.status}</div>
                </div>
              ))}
              <button
                onClick={() => setShowInfraAlerts(true)}
                className="w-full text-sm text-gray-600 hover:text-gray-900 mt-2"
              >
                View All Updates
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AlertsModal
          isOpen={showTrafficAlerts}
          onClose={() => setShowTrafficAlerts(false)}
          title="Traffic Alerts"
          alerts={trafficAlerts}
          type="traffic"
        />
        <AlertsModal
          isOpen={showEnvAlerts}
          onClose={() => setShowEnvAlerts(false)}
          title="Environmental Alerts"
          alerts={environmentalAlerts}
          type="environmental"
        />
        <AlertsModal
          isOpen={showInfraAlerts}
          onClose={() => setShowInfraAlerts(false)}
          title="Infrastructure Updates"
          alerts={infrastructureUpdates}
          type="infrastructure"
        />
      </div>
    </div>
  );
};

export default Dashboard;