import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const LeaderboardScreen = ({ fixtureResults = {} }) => {
  const [players, setPlayers] = useState([
    { name: "Anish", points: 0 },
    { name: "Supriyam", points: 0 },
    { name: "Shashwata", points: 0 },
    { name: "Aron", points: 0 },
    { name: "Ashwin", points: 0 },
    { name: "Akash", points: 0 },
    { name: "Indrajit", points: 0 },
  ]);

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const playerPoints = {};
    
    // Calculate points from fixture results
    Object.values(fixtureResults).forEach(matchResults => {
      matchResults.forEach(result => {
        if (result.name) { // Skip empty names
          playerPoints[result.name] = (playerPoints[result.name] || 0) + result.points;
        }
      });
    });

    const updatedPlayers = players.map(player => ({
      ...player,
      points: playerPoints[player.name] || 0,
    }));

    updatedPlayers.sort((a, b) => {
      if (b.points === a.points) return a.name.localeCompare(b.name);
      return b.points - a.points;
    });

    // Handle ties in positions
    const finalPlayers = updatedPlayers.map((player, index, array) => ({
      ...player,
      position: index > 0 && player.points === array[index-1].points 
        ? array[index-1].position 
        : index + 1
    }));

    setPlayers(finalPlayers);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [fixtureResults]);

  return (
    <div className="min-h-screen bg-[#E6E6FA] flex items-center justify-center p-4">
      {showConfetti && <Confetti />}

      <div className="max-w-7xl w-full px-4">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-poppins">
            Leaderboard
          </h1>
        </div>

        {/* Top 3 Players */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          {/* 1st Place */}
          {players.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-pink-600 text-center w-full md:w-1/3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
                🥇 1st Place
              </span>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 font-poppins mt-2 truncate">
                {players[0].name}
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-900 font-poppins">
                {players[0].points} pts
              </p>
            </motion.div>
          )}

          {/* 2nd Place */}
          {players.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-yellow-600 text-center w-full md:w-1/3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
                🥈 2nd Place
              </span>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 font-poppins mt-2 truncate">
                {players[1].name}
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-900 font-poppins">
                {players[1].points} pts
              </p>
            </motion.div>
          )}

          {/* 3rd Place */}
          {players.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-purple-600 text-center w-full md:w-1/3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
                🥉 3rd Place
              </span>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 font-poppins mt-2 truncate">
                {players[2].name}
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-900 font-poppins">
                {players[2].points} pts
              </p>
            </motion.div>
          )}
        </div>

        {/* Other Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {players.slice(3).map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-2xl shadow-lg border-2 bg-gray-100 border-gray-300 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-gray-900 font-poppins">
                      #{player.position}
                    </span>
                    <span className="text-lg font-semibold text-gray-800 font-poppins truncate">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 font-poppins">
                    {player.points} pts
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Go Back Button */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-poppins text-center"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;