import React, { useEffect, useState } from "react";
import { getCoins } from "../utils/vriddhi";
import "./VriddhiCard.css";

const VriddhiCard = () => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    setCoins(getCoins());
  }, []);

  // Example level targets (modify later if you want)
  const nextLevelTarget = 500;
  const progress = Math.min((coins / nextLevelTarget) * 100, 100);

  return (
    <div className="vriddhi-card">
      <div className="vriddhi-header">
        <img src="/coins/gold-coin.png" className="vriddhi-icon" alt="coin" />
        <h2 className="vriddhi-title">Vriddhi Coins</h2>
      </div>

      <div className="vriddhi-count">{coins}</div>

      <div className="vriddhi-progress">
        <div className="vriddhi-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="vriddhi-info">
        {coins} / {nextLevelTarget} → Next Level
      </div>

      <button className="vriddhi-btn">Redeem Rewards</button>
    </div>
  );
};

export default VriddhiCard;
