import React from 'react';
import { LOTTERY_TYPES, LotteryType } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface LotterySelectorProps {
  selectedLottery: LotteryType;
  onSelect: (lottery: LotteryType) => void;
}

export function LotterySelector({ selectedLottery, onSelect }: LotterySelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Lottery Type
      </label>
      <Select
        value={selectedLottery.id}
        onValueChange={(value) => {
          const lottery = LOTTERY_TYPES.find(l => l.id === value);
          if (lottery) onSelect(lottery);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a lottery type" />
        </SelectTrigger>
        <SelectContent>
          {LOTTERY_TYPES.map((lottery) => (
            <SelectItem key={lottery.id} value={lottery.id}>
              {lottery.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="mt-2 text-sm text-gray-500">
        {selectedLottery.description}
      </p>
    </div>
  );
}