// Filepath: src/app/groups/[groupId]/BalanceHistory.tsx

'use client';

import { useState, useEffect } from 'react';

// Define the data structure for a history item
interface HistoryItem {
  id: string;
  amount: number;
  recordedAt: string;
  debtor: { name: string };
  creditor: { name: string };
}

interface BalanceHistoryProps {
  groupId: string;
  currency?: string;
}

export default function BalanceHistory({ groupId, currency = '$' }: BalanceHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) return;

    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/groups/${groupId}/history`);
        if (!response.ok) {
          throw new Error('Failed to fetch balance history');
        }
        // --- FIX IS HERE ---
        const data = (await response.json()) as HistoryItem[];
        setHistory(data);
      } catch (err) {
        // --- And a small fix for the catch block ---
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [groupId]);

  if (isLoading) return <p className="text-center p-4">Loading history...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Balance History</h2>
      {history.length === 0 ? (
        <p className="p-4 bg-gray-100 rounded-lg">No balance history found.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium">
                  <span className="font-bold text-red-600">{item.debtor.name}</span> owed <span className="font-bold text-green-600">{item.creditor.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.recordedAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-lg font-semibold">
                {currency}{item.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}