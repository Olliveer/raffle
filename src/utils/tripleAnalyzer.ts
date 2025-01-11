import { LotteryType } from '../types';

export interface TripleResult {
  numbers: [number, number, number];
  frequency: number;
  percentage: number;
}

export function analyzeTriples(
  data: { [key: string]: number[] },
  lotteryType: LotteryType,
  limit: number = 10
): TripleResult[] {
  const triples: { [key: string]: number } = {};
  const totalDraws = Object.keys(data).length;

  // Analyze each draw for triples
  Object.values(data).forEach((numbers) => {
    // Generate all possible triples in the draw
    for (let i = 0; i < numbers.length - 2; i++) {
      for (let j = i + 1; j < numbers.length - 1; j++) {
        for (let k = j + 1; k < numbers.length; k++) {
          const triple = [numbers[i], numbers[j], numbers[k]].sort((a, b) => a - b);
          const tripleKey = triple.join('-');
          triples[tripleKey] = (triples[tripleKey] || 0) + 1;
        }
      }
    }
  });

  return Object.entries(triples)
    .map(([triple, frequency]) => ({
      numbers: triple.split('-').map(Number) as [number, number, number],
      frequency,
      percentage: (frequency / totalDraws) * 100
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit);
}