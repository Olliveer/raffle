import React from 'react';
import { PairResult } from '../utils/pairAnalyzer';
import { LotteryType } from '../types';

interface PairsTableProps {
  pairs: PairResult[];
  lotteryType: LotteryType;
}

export function PairsTable({ pairs, lotteryType }: PairsTableProps) {
  if (pairs.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Most Common Number Pairs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number Pair
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pairs.map((pair, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pair.numbers[0]} - {pair.numbers[1]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pair.frequency}x
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pair.percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        These pairs of numbers appeared together most frequently in {lotteryType.name} draws
      </p>
    </div>
  );
}