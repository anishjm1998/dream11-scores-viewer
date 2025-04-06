import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FixturesScreen from './screens/FixturesScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import PointsSystemScreen from './screens/PointsSystemScreen';

import preloadedData from './data/preloadedResults.json';

function App() {
  return (
    <Router basename="/Dream11-Tracker-Viewer">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route 
          path="/fixtures" 
          element={<FixturesScreen fixtureResults={preloadedData.fixtureResults} />} 
        />
        <Route 
          path="/leaderboard" 
          element={<LeaderboardScreen fixtureResults={preloadedData.fixtureResults} />} 
        />
        <Route path="/points-system" element={<PointsSystemScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;