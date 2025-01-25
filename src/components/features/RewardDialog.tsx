import React from 'react';
import { Gift, X } from 'lucide-react';
import type { Reward } from '../../types';

interface RewardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reward: Reward;
}

const RewardDialog: React.FC<RewardDialogProps> = ({ isOpen, onClose, reward }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <Gift className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Claim Your Reward</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={reward.sponsor.logo}
              alt={reward.sponsor.name}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{reward.title}</h4>
              <p className="text-sm text-gray-600">Sponsored by {reward.sponsor.name}</p>
            </div>
          </div>

          <p className="text-gray-700">{reward.description}</p>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-700 font-medium">Required Points</span>
              <span className="text-purple-800 font-bold">{reward.pointsCost}</span>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              Valid until {new Date(reward.validUntil).toLocaleDateString()}
            </div>
          </div>

          <button
            className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700 transition-colors duration-200"
            onClick={() => {
              // TODO: Implement reward claiming logic
              onClose();
            }}
          >
            Claim Reward
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardDialog;