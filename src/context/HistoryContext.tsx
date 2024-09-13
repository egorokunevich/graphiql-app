'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { HistoryContextType, HistoryEntry } from '@src/types/index';

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<HistoryEntry | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = JSON.parse(
        localStorage.getItem('requestHistory') || '[]',
      );
      setHistory(storedHistory);
    }
  }, []);

  const addHistoryEntry = (entry: HistoryEntry) => {
    const updatedHistory = [...history, entry];
    setHistory(updatedHistory);
    if (typeof window !== 'undefined') {
      localStorage.setItem('requestHistory', JSON.stringify(updatedHistory));
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('requestHistory');
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistoryEntry,
        clearHistory,
        selectedRequest,
        setSelectedRequest,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
