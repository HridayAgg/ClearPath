import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import type { LeaderboardEntry } from '../../types';

const Leaderboard: React.FC = () => {
  const leaderboard: LeaderboardEntry[] = [
    {
      userId: '1',
      name: 'John Doe',
      points: 1250,
      rank: 1,
      contributionCount: 25,
    },
    // Add more entries
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Leaders</h2>
      
      <div className="space-y-4">
        {leaderboard.map((entry) => (
          <div
            key={entry.userId}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex-shrink-0">
              {getRankIcon(entry.rank) || (
                <div className="w-6 h-6 flex items-center justify-center font-semibold text-gray-500">
                  {entry.rank}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {entry.name}
              </p>
              <p className="text-sm text-gray-500">
                {entry.contributionCount} contributions
              </p>
            </div>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {entry.points} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;