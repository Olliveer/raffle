import { LotteryType } from '../types';

interface DrawData {
  [key: string]: number[];
}

export interface CombinationResult {
  numbers: number[];
  frequency: number;
  percentage: number;
}

export function analyzeCombinations(
  data: DrawData,
  lotteryType: LotteryType,
  limit: number = 5
): CombinationResult[] {
  const combinations: { [key: string]: number } = {};
  const totalDraws = Object.keys(data).length;

  // Convert each draw into a sorted combination string
  Object.values(data).forEach((numbers) => {
    const combination = numbers.sort((a, b) => a - b).join('-');
    combinations[combination] = (combinations[combination] || 0) + 1;
  });

  // Convert to array and sort by frequency
  const results = Object.entries(combinations)
    .map(([combination, frequency]) => ({
      numbers: combination.split('-').map(Number),
      frequency,
      percentage: (frequency / totalDraws) * 100
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit);

  return results;
}