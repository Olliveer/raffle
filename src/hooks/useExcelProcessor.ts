import { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { processExcelData, ProcessedData } from "../utils/excelProcessor";
import { ExcelRow, LotteryType } from "../types";

export function useExcelProcessor(
  setResults: (results: ProcessedData) => void,
  lotteryType: LotteryType
) {
  const [error, setError] = useState<string>("");

  const processFile = useCallback(
    async (file: File) => {
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, {
          type: "array",
          raw: true,
        });

        if (workbook.SheetNames.length === 0) {
          throw new Error("The Excel file is empty");
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
          raw: true,
          defval: null,
          header: "A",
        });

        if (jsonData.length <= 1) {
          throw new Error("No data found in the Excel file");
        }

        // Get headers from the first row
        const headerRow = jsonData[0];
        const headers: { [key: string]: string } = {};

        // Map column letters to header names
        Object.entries(headerRow).forEach(([col, value]) => {
          if (value) headers[col] = String(value).toLowerCase().trim();
        });

        // Process data rows
        const formattedData = jsonData.slice(1).map((row) => {
          const obj: Record<string, string> = {};
          Object.entries(row).forEach(([col, value]) => {
            const header = headers[col];
            if (header) {
              obj[header] = value;
            }
          });
          return obj as ExcelRow;
        });

        const results = processExcelData(formattedData, lotteryType);
        setResults(results);
        setError("");
      } catch (err) {
        console.error("Error processing file:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error processing file. Please ensure it matches the expected format."
        );
      }
    },
    [setResults, lotteryType]
  );

  return { processFile, error };
}
