import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AdminView from './components/AdminView';
import PublicView from './components/PublicView';
import UserProfile from './components/userprofile'; // Ensure the correct import path
import TransportSchedule from './components/features/TransportSchedule';
import Leaderboard from './components/features/Leaderboard';
import RewardDialog from './components/features/RewardDialog';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Dashboard Route */}
              <Route path="/" element={<Dashboard />} />

              {/* Admin and Public Views */}
              <Route path="/admin" element={<AdminView />} />
              <Route path="/public" element={<PublicView />} />

              {/* Transport Schedule and Leaderboard Routes */}
              <Route path="/transport" element={<TransportSchedule />} />
              <Route path="/leaderboard" element={<Leaderboard />} />

              {/* User Profile Route */}
              <Route path="/userprofile" element={<UserProfile />} />

              {/* Optional: RewardDialog can be rendered conditionally within a component or as a route */}
              {/* <Route path="/reward" element={<RewardDialog />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;