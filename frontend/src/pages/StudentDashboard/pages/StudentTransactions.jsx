import React, { useState, useEffect } from 'react';
import { getHistory } from '../../../utils/vriddhi';

const StudentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getHistory();
      setTransactions(history);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <div className="student-content">
      <h1>Transaction History</h1>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((tx, index) => (
            <div key={index} className={`transaction-item ${tx.amount > 0 ? 'credit' : 'debit'}`}>
              <div className="tx-details">
                <span className="tx-reason">{tx.reason}</span>
                <span className="tx-date">{new Date(tx.timestamp).toLocaleString()}</span>
              </div>
              <div className="tx-amount">
                {tx.amount > 0 ? '+' : ''}{tx.amount} Coins
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentTransactions;
