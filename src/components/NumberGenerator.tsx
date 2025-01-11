import React, { useState } from 'react';
import { Copy, Shuffle } from 'lucide-react';
import { LotteryType } from '../types';
import { generateNumbers } from '../utils/numberGenerator';

interface NumberGeneratorProps {
  lotteryTypes: LotteryType[];
  frequencies?: { [key: string]: any };
}

export function NumberGenerator({ lotteryTypes, frequencies }: NumberGeneratorProps) {
  const [numbers, setNumbers] = useState<{ [key: string]: number[] }>({});

  const generateForAll = () => {
    const newNumbers = lotteryTypes.reduce((acc, lottery) => ({
      ...acc,
      [lottery.id]: generateNumbers(lottery, frequencies?.[lottery.id]?.frequencies)
    }), {});
    setNumbers(newNumbers);
  };

  const copyNumbers = (lotteryId: string) => {
    if (numbers[lotteryId]) {
      navigator.clipboard.writeText(numbers[lotteryId].join(' - '));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {lotteryTypes.map((lottery) => (
        <div
          key={lottery.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">{lottery.name}</h3>
            <button
              onClick={() => {
                setNumbers(prev => ({
                  ...prev,
                  [lottery.id]: generateNumbers(lottery, frequencies?.[lottery.id]?.frequencies)
                }));
              }}
              className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
              title={frequencies?.[lottery.id]?.frequencies ? "Generate weighted numbers" : "Generate random numbers"}
            >
              <Shuffle className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-mono">
              {numbers[lottery.id] 
                ? numbers[lottery.id].join(' - ')
                : 'Click shuffle to generate'}
            </p>
            {numbers[lottery.id] && (
              <button
                onClick={() => copyNumbers(lottery.id)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 transition-colors"
                title="Copy numbers"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
          {frequencies?.[lottery.id]?.frequencies && (
            <p className="text-xs text-gray-500 mt-2">Using frequency-based weighting</p>
          )}
        </div>
      ))}
    </div>
  );
}