import React, { useState } from "react";
import { getCoins, deductCoins } from "../../utils/vriddhi";
import "./RedeemRewards.css";

const rewards = [
  {
    id: 1,
    title: "Amazon Gift Voucher",
    cost: 200,
    image: "/rewards/amazon.png",
  },
  {
    id: 2,
    title: "Unlock Any Premium Course",
    cost: 350,
    image: "/rewards/premium-course.png",
  },
  {
    id: 3,
    title: "Exclusive Profile Badge",
    cost: 150,
    image: "/rewards/badge.png",
  },
  {
    id: 4,
    title: "1-on-1 Mentor Session (30 min)",
    cost: 500,
    image: "/rewards/mentor.png",
  },
];

const RedeemRewards = () => {
  const [coins, setCoins] = useState(getCoins());
  const [selected, setSelected] = useState(null);

  const handleRedeem = (reward) => {
    if (coins < reward.cost) {
      alert("❌ Not enough coins");
      return;
    }
    setSelected(reward);
  };

  const confirmRedeem = () => {
    deductCoins(selected.cost);
    setCoins(getCoins());
    setSelected(null);
    alert("🎉 Reward redeemed successfully!");
  };

  return (
    <div className="redeem-container">

      <h1 className="redeem-title">Redeem Rewards</h1>
      <p className="redeem-coins">Available Coins: <b>{coins}</b></p>

      <div className="redeem-grid">
        {rewards.map((reward) => (
          <div className="reward-card" key={reward.id}>
            <img src={reward.image} alt="" className="reward-img" />
            <h3>{reward.title}</h3>

            <p className="reward-cost">{reward.cost} coins</p>

            <button
              className={`redeem-btn ${coins < reward.cost ? "disabled" : ""}`}
              onClick={() => handleRedeem(reward)}
              disabled={coins < reward.cost}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="redeem-modal">
          <div className="redeem-modal-box">
            <h2>Redeem {selected.title}?</h2>
            <p>This will cost <b>{selected.cost} coins</b>.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSelected(null)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmRedeem}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RedeemRewards;
