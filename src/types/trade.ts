export interface Trade {
  id: string;
  entryDate: string;
  entryPrice: number;
  exitDate?: string;
  exitPrice?: number;
  pair: string;
  position: 'long' | 'short';
  size: number;
  notes?: string;
  isOpen: boolean;
}