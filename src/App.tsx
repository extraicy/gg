import React, { useState } from 'react';
import { BTCPriceHeader } from './components/BTCPriceHeader';
import { TradeForm } from './components/TradeForm';
import { TradeList } from './components/TradeList';
import { Trade } from './types/trade';

function App() {
  const [trades, setTrades] = useState<Trade[]>([]);

  const handleAddTrade = (trade: Trade) => {
    setTrades(prevTrades => [trade, ...prevTrades]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BTCPriceHeader />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Trade</h2>
            <TradeForm onSubmit={handleAddTrade} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Trade History</h2>
            <TradeList trades={trades} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;