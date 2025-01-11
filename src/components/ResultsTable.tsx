import React from 'react';
import { NumberFrequency } from '../types';

interface ResultsTableProps {
  results: NumberFrequency[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Frequency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Probability
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.map((result) => (
            <tr key={result.number}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {result.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.frequency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(result.probability * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};