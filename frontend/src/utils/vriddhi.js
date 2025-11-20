// API-based functions for Vriddhi Coins
import api from '../services/api';

// Get user coins from backend
export async function getCoins() {
  try {
    const response = await api.get('/coins/get');
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return 0;
  }
}

// Add coins via backend
export async function addCoins(amount, reason = "Reward Earned") {
  try {
    const response = await api.post('/coins/add', { amount, reason });
    return response.data.coins;
  } catch (error) {
    console.error('Error adding coins:', error);
    return 0;
  }
}

// Deduct coins via backend
export async function deductCoins(amount, reason = "Coins Spent") {
  try {
    const response = await api.post('/coins/redeem', { amount, reward: reason });
    return response.data.coins;
  } catch (error) {
    console.error('Error deducting coins:', error);
    return 0;
  }
}

// Legacy functions for backward compatibility (deprecated)
export function initVriddhi() {
  // No-op
}

export function logTransaction(amount, reason) {
  // No-op - transactions logged on backend
}

export function getHistory() {
  // TODO: Implement if needed for transaction history from backend
  return [];
}
