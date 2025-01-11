import React from 'react';
import { LotteryType } from '../types';

interface ExcelFormatExampleProps {
  lotteryType: LotteryType;
}

export function ExcelFormatExample({ lotteryType }: ExcelFormatExampleProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Expected Excel Format for {lotteryType.name}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-4 py-2">Concurso</th>
              <th className="border px-4 py-2">Data</th>
              {Array.from({ length: lotteryType.ballCount }).map((_, i) => (
                <th key={i} className="border px-4 py-2">bola {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">2810</td>
              <td className="border px-4 py-2">31/12/2024</td>
              {Array.from({ length: lotteryType.ballCount }).map((_, i) => (
                <td key={i} className="border px-4 py-2">{i + 1}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Your Excel file should follow this format with columns for Concurso (contest number), 
        Data (date), and bola 1 through bola {lotteryType.ballCount} (numbers from 1 to {lotteryType.maxNumber}).
      </p>
    </div>
  );
}