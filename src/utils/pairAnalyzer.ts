import { LotteryType } from '../types';

export interface PairResult {
  numbers: [number, number];
  frequency: number;
  percentage: number;
}

export function analyzePairs(
  data: { [key: string]: number[] },
  lotteryType: LotteryType,
  limit: number = 10
): PairResult[] {
  const pairs: { [key: string]: number } = {};
  const totalDraws = Object.keys(data).length;

  // Analyze each draw for pairs
  Object.values(data).forEach((numbers) => {
    // Generate all possible pairs in the draw
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const pair = [numbers[i], numbers[j]].sort((a, b) => a - b);
        const pairKey = pair.join('-');
        pairs[pairKey] = (pairs[pairKey] || 0) + 1;
      }
    }
  });

  // Convert to array and sort by frequency
  return Object.entries(pairs)
    .map(([pair, frequency]) => ({
      numbers: pair.split('-').map(Number) as [number, number],
      frequency,
      percentage: (frequency / totalDraws) * 100
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit);
}