import { LotteryType, NumberFrequency } from '../types';

function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateRandomNumbers(lottery: LotteryType): number[] {
  const numbers = Array.from({ length: lottery.maxNumber }, (_, i) => i + 1);
  return shuffleArray(numbers).slice(0, lottery.ballCount).sort((a, b) => a - b);
}

function generateWeightedNumbers(lottery: LotteryType, frequencies: NumberFrequency[]): number[] {
  // Create weighted pool based on frequencies
  const pool: number[] = [];
  frequencies.forEach(({ number, frequency }) => {
    // Add each number to the pool multiple times based on its frequency
    for (let i = 0; i < frequency; i++) {
      pool.push(number);
    }
  });

  const result: number[] = [];
  const usedNumbers = new Set();

  // Select numbers from pool until we have enough unique numbers
  while (result.length < lottery.ballCount && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    const number = pool[index];
    
    if (!usedNumbers.has(number)) {
      result.push(number);
      usedNumbers.add(number);
    }
    
    // Remove used number from pool to avoid reselecting
    pool.splice(index, 1);
  }

  // If we don't have enough numbers, fill remaining with random numbers
  if (result.length < lottery.ballCount) {
    const remaining = Array.from({ length: lottery.maxNumber }, (_, i) => i + 1)
      .filter(n => !usedNumbers.has(n));
    
    while (result.length < lottery.ballCount) {
      const index = Math.floor(Math.random() * remaining.length);
      result.push(remaining[index]);
      remaining.splice(index, 1);
    }
  }

  return result.sort((a, b) => a - b);
}

export function generateNumbers(lottery: LotteryType, frequencies?: NumberFrequency[]): number[] {
  if (frequencies && frequencies.length > 0) {
    return generateWeightedNumbers(lottery, frequencies);
  }
  return generateRandomNumbers(lottery);
}