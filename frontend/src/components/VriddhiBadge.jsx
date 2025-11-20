// VriddhiBadge.jsx

import React, { useState, useEffect } from 'react';

import { getCoins } from '../utils/vriddhi';

const VriddhiBadge = () => {

  const [coins, setCoins] = useState(0);

  useEffect(() => {

    const updateCoins = () => setCoins(getCoins());

    updateCoins();

    // Listen for storage changes to update coins in real-time

    window.addEventListener('storage', updateCoins);

    return () => window.removeEventListener('storage', updateCoins);

  }, []);

  return (

    <div className="vriddhi-badge">

      <span className="coin-icon">🪙</span>

      <span className="coin-count">{coins}</span>

    </div>

  );

};

export default VriddhiBadge;
