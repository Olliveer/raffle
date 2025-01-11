import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { FileUploader } from "./components/FileUploader";
import { ExcelFormatExample } from "./components/ExcelFormatExample";
import { Header } from "./components/Header";
import { LotterySelector } from "./components/LotterySelector";
import { NumberGenerator } from "./components/NumberGenerator";
import { ResultsTabs } from "./components/ResultsTabs";
import { useExcelProcessor } from "./hooks/useExcelProcessor";
import { LOTTERY_TYPES } from "./types";
import { ProcessedData } from "./utils/excelProcessor";

export default function App() {
  const [results, setResults] = useState<{ [key: string]: ProcessedData }>({});
  const [selectedLottery, setSelectedLottery] = useState(LOTTERY_TYPES[0]);
  const { processFile, error } = useExcelProcessor((data) => {
    setResults((prev) => ({
      ...prev,
      [selectedLottery.id]: data,
    }));
  }, selectedLottery);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header
          icon={<FileSpreadsheet className="h-12 w-12 mx-auto text-blue-500" />}
          title="Lottery Number Probability Calculator"
          subtitle="Select a lottery type and upload your Excel file to analyze number frequencies"
        />

        <NumberGenerator
          lotteryTypes={LOTTERY_TYPES}
          frequencies={results}
        />

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <LotterySelector
            selectedLottery={selectedLottery}
            onSelect={setSelectedLottery}
          />
          <FileUploader onFileUpload={processFile} />
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>

        {results[selectedLottery.id] && (
          <ResultsTabs
            frequencies={results[selectedLottery.id].frequencies}
            pairs={results[selectedLottery.id].pairs}
            triples={results[selectedLottery.id].triples}
            lotteryType={selectedLottery}
          />
        )}

        <ExcelFormatExample lotteryType={selectedLottery} />
      </div>
    </div>
  );
}
