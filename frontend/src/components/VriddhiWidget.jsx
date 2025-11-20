// VriddhiWidget.jsx

import React, { useState, useEffect } from 'react';
import { getCoins, addCoins } from '../utils/vriddhi';

const VriddhiWidget = () => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const updateCoins = () => setCoins(getCoins());
    updateCoins();

    window.addEventListener('storage', updateCoins);
    return () => window.removeEventListener('storage', updateCoins);
  }, []);

  const handleEarnCoins = () => {
    addCoins(10, "Daily Login Bonus");
    setCoins(getCoins());
  };

  return (
    <div className="vriddhi-widget">
      <h3>Vriddhi Coins</h3>
      <div className="coin-display">
        <span className="coin-icon">🪙</span>
        <span className="coin-count">{coins}</span>
      </div>
      <button className="earn-coins-btn" onClick={handleEarnCoins}>
        Earn 10 Coins
      </button>
    </div>
  );
};

export default VriddhiWidget;
