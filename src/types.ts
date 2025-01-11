export interface NumberFrequency {
  number: number;
  frequency: number;
  probability: number;
}

export interface ExcelRow {
  concurso: number;
  data: string;
  [key: string]: any;
}

export interface LotteryType {
  id: string;
  name: string;
  ballCount: number;
  maxNumber: number;
  description: string;
}

export const LOTTERY_TYPES: LotteryType[] = [
  {
    id: 'lotofacil',
    name: 'Lotofácil',
    ballCount: 15,
    maxNumber: 25,
    description: 'Choose 15 numbers from 1 to 25'
  },
  {
    id: 'megasena',
    name: 'Mega-Sena',
    ballCount: 6,
    maxNumber: 60,
    description: 'Choose 6 numbers from 1 to 60'
  }
];