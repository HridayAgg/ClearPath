import React from 'react';
import { Trophy, Award, Medal, Star, MapPin, AlertTriangle } from 'lucide-react';

// Define the LeaderboardEntry type
type LeaderboardEntry = {
  userId: string;
  name: string;
  points: number;
  rank: number;
  contributionCount: number;
};

const Leaderboard: React.FC = () => {
  // Mock data for the leaderboard
  const leaderboard: LeaderboardEntry[] = [
    {
      userId: '1',
      name: 'Sarah Chen',
      points: 1250,
      rank: 1,
      contributionCount: 25,
    },
    {
      userId: '2',
      name: 'Michael Rodriguez',
      points: 980,
      rank: 2,
      contributionCount: 19,
    },
    {
      userId: '3',
      name: 'Emma Thompson',
      points: 875,
      rank: 3,
      contributionCount: 16,
    },
    {
      userId: '4',
      name: 'David Kim',
      points: 720,
      rank: 4,
      contributionCount: 14,
    },
    {
      userId: '5',
      name: 'Lisa Patel',
      points: 650,
      rank: 5,
      contributionCount: 12,
    },
  ];

  // Function to get the rank icon based on the rank
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Award className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-600" />;
      default:
        return <Star className="h-6 w-6 text-purple-500" />;
    }
  };

  // Function to get the contribution type icon based on the count
  const getContributionTypeIcon = (count: number) => {
    if (count > 20) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (count > 10) return <MapPin className="h-5 w-5 text-orange-500" />;
    return <MapPin className="h-5 w-5 text-blue-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Community Champions</h2>
            <p className="text-gray-600 mt-2">Top contributors making our city better</p>
          </div>

          {/* Top 3 Users Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboard.slice(0, 3).map((entry) => (
              <div
                key={entry.userId}
                className="relative bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 shadow-md transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">{entry.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 my-2">
                    {entry.points} pts
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    {getContributionTypeIcon(entry.contributionCount)}
                    <span>{entry.contributionCount} reports</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Rankings Section */}
          <div className="space-y-4">
            {leaderboard.slice(3).map((entry) => (
              <div
                key={entry.userId}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-50 rounded-full">
                  <span className="text-xl font-semibold text-purple-600">#{entry.rank}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">{entry.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {getContributionTypeIcon(entry.contributionCount)}
                    <span>{entry.contributionCount} contributions</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{entry.points}</div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>

          {/* Point System Info Section */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">How to Earn Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span>Report Issue: +50 points</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-purple-500" />
                <span>Urgent Alert: +100 points</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-purple-500" />
                <span>Verified Report: +25 bonus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;