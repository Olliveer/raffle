import React from 'react';
import { CombinationResult } from '../utils/combinationAnalyzer';
import { LotteryType } from '../types';

interface CombinationsTableProps {
  combinations: CombinationResult[];
  lotteryType: LotteryType;
}

export function CombinationsTable({ combinations, lotteryType }: CombinationsTableProps) {
  if (combinations.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Most Common Combinations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Combination
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
            {combinations.map((combo, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {combo.numbers.join(' - ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {combo.frequency}x
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {combo.percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        These combinations appeared most frequently in {lotteryType.name} draws
      </p>
    </div>
  );
}