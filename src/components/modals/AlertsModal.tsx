import React from 'react';
import { X } from 'lucide-react';
import type { TrafficAlert, EnvironmentalAlert, InfrastructureUpdate } from '../../types';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  alerts: (TrafficAlert | EnvironmentalAlert | InfrastructureUpdate)[];
  type: 'traffic' | 'environmental' | 'infrastructure';
}

const AlertsModal: React.FC<AlertsModalProps> = ({
  isOpen,
  onClose,
  title,
  alerts,
  type,
}) => {
  if (!isOpen) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
      case 'severe':
        return 'text-red-600 bg-red-50';
      case 'medium':
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {alert.title}
                </h3>
                {'severity' in alert && (
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                )}
                {'level' in alert && (
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(alert.level)}`}>
                    {alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}
                  </span>
                )}
                {'status' in alert && (
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-2">{alert.description}</p>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{alert.location}</span>
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
              </div>

              {'estimatedCompletion' in alert && (
                <div className="mt-2 text-sm text-gray-500">
                  Estimated completion: {new Date(alert.estimatedCompletion).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsModal;