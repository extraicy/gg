import React, { useEffect, useState } from 'react';
import { Bitcoin } from 'lucide-react';
import { getCurrentBTCPrice } from '../services/priceService';

export const BTCPriceHeader: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const currentPrice = await getCurrentBTCPrice();
      setPrice(currentPrice);
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Bitcoin className="h-6 w-6" />
        <span className="font-bold">BTC/USD:</span>
        {price ? (
          <span className="font-mono">${price.toLocaleString()}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};