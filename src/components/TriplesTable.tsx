import React from 'react';
import { TripleResult } from '../utils/tripleAnalyzer';
import { LotteryType } from '../types';

interface TriplesTableProps {
  triples: TripleResult[];
  lotteryType: LotteryType;
}

export function TriplesTable({ triples, lotteryType }: TriplesTableProps) {
  if (triples.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Most Common Number Triples</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number Triple
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
            {triples.map((triple, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {triple.numbers.join(' - ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {triple.frequency}x
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {triple.percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        These three numbers appeared together most frequently in {lotteryType.name} draws
      </p>
    </div>
  );
}