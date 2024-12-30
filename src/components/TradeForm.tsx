import React, { useState } from 'react';
import { getHistoricalPrice } from '../services/priceService';

interface TradeFormProps {
  onSubmit: (trade: any) => void;
}

export const TradeForm: React.FC<TradeFormProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    entryDate: '',
    entryTime: '',
    exitDate: '',
    exitTime: '',
    pair: 'BTC/USD',
    position: 'long',
    size: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const entryTimestamp = `${formData.entryDate}T${formData.entryTime}`;
      const entryPrice = await getHistoricalPrice(entryTimestamp);

      let exitPrice;
      if (formData.exitDate && formData.exitTime) {
        const exitTimestamp = `${formData.exitDate}T${formData.exitTime}`;
        exitPrice = await getHistoricalPrice(exitTimestamp);
      }

      const trade = {
        id: Date.now().toString(),
        entryDate: entryTimestamp,
        entryPrice,
        exitDate: formData.exitDate ? `${formData.exitDate}T${formData.exitTime}` : undefined,
        exitPrice,
        pair: formData.pair,
        position: formData.position,
        size: Number(formData.size),
        notes: formData.notes,
        isOpen: !formData.exitDate
      };

      onSubmit(trade);
      setFormData({
        entryDate: '',
        entryTime: '',
        exitDate: '',
        exitTime: '',
        pair: 'BTC/USD',
        position: 'long',
        size: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating trade:', error);
      alert('Error fetching price data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Entry Date</label>
          <input
            type="date"
            required
            value={formData.entryDate}
            onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Entry Time</label>
          <input
            type="time"
            required
            value={formData.entryTime}
            onChange={(e) => setFormData({ ...formData, entryTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Exit Date</label>
          <input
            type="date"
            value={formData.exitDate}
            onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Exit Time</label>
          <input
            type="time"
            value={formData.exitTime}
            onChange={(e) => setFormData({ ...formData, exitTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <select
          required
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Size (USD)</label>
        <input
          type="number"
          required
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter position size in USD"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Add any trade notes here..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Add Trade'}
      </button>
    </form>
  );
};