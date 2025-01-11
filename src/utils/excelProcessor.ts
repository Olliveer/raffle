import { NumberFrequency, ExcelRow, LotteryType } from '../types';
import { analyzeCombinations, CombinationResult } from './combinationAnalyzer';
import { analyzePairs, PairResult } from './pairAnalyzer';
import { analyzeTriples, TripleResult } from './tripleAnalyzer';

export interface ProcessedData {
  frequencies: NumberFrequency[];
  combinations: CombinationResult[];
  pairs: PairResult[];
  triples: TripleResult[];
}

export const processExcelData = (data: ExcelRow[], lotteryType: LotteryType): ProcessedData => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No valid data found in the Excel file');
  }

  const numberCounts: { [key: number]: number } = {};
  let totalNumbers = 0;
  const drawData: { [key: string]: number[] } = {};

  // Process each row
  data.forEach((row, index) => {
    const numbers: number[] = [];
    
    // Process columns from "bola 1" to "bola N" based on lottery type
    for (let i = 1; i <= lotteryType.ballCount; i++) {
      const value = row[`bola ${i}`];
      if (value !== undefined && value !== null) {
        const number = Number(value);
        if (!isNaN(number) && number > 0 && number <= lotteryType.maxNumber) {
          numberCounts[number] = (numberCounts[number] || 0) + 1;
          totalNumbers++;
          numbers.push(number);
        }
      }
    }

    if (numbers.length === lotteryType.ballCount) {
      drawData[index] = numbers;
    }
  });

  if (totalNumbers === 0) {
    throw new Error('No valid numbers found in the bola columns');
  }

  // Calculate frequencies and probabilities
  const frequencies: NumberFrequency[] = Object.entries(numberCounts).map(([number, count]) => ({
    number: parseInt(number),
    frequency: count,
    probability: count / totalNumbers
  }));

  // Analyze combinations, pairs, and triples
  const combinations = analyzeCombinations(drawData, lotteryType);
  const pairs = analyzePairs(drawData, lotteryType);
  const triples = analyzeTriples(drawData, lotteryType);

  return {
    frequencies: frequencies.sort((a, b) => b.frequency - a.frequency),
    combinations,
    pairs,
    triples
  };
};