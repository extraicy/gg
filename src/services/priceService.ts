import axios from 'axios';

export const getCurrentBTCPrice = async (): Promise<number> => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    return response.data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    throw error;
  }
};

export const getHistoricalPrice = async (timestamp: string): Promise<number> => {
  try {
    const date = new Date(timestamp).getTime() / 1000;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${date}&to=${date + 3600}`
    );
    return response.data.prices[0][1];
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
};