import React from 'react';
import { Tabs } from './Tabs';
import { ResultsTable } from './ResultsTable';
import { PairsTable } from './PairsTable';
import { TriplesTable } from './TriplesTable';
import { NumberFrequency, LotteryType } from '../types';
import { PairResult } from '../utils/pairAnalyzer';
import { TripleResult } from '../utils/tripleAnalyzer';

interface ResultsTabsProps {
  frequencies: NumberFrequency[];
  pairs: PairResult[];
  triples: TripleResult[];
  lotteryType: LotteryType;
}

export function ResultsTabs({ frequencies, pairs, triples, lotteryType }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = React.useState('frequencies');

  const tabs = [
    { id: 'frequencies', label: 'Individual Numbers' },
    { id: 'pairs', label: 'Number Pairs' },
    { id: 'triples', label: 'Number Triples' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="mt-6">
        {activeTab === 'frequencies' && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Individual Number Statistics for {lotteryType.name}
            </h2>
            <ResultsTable results={frequencies} />
          </>
        )}
        
        {activeTab === 'pairs' && (
          <PairsTable pairs={pairs} lotteryType={lotteryType} />
        )}

        {activeTab === 'triples' && (
          <TriplesTable triples={triples} lotteryType={lotteryType} />
        )}
      </div>
    </div>
  );
}