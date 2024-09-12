'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem('requestHistory') || '[]',
    );
    return storedHistory;
  });

  const addHistoryEntry = (entry: HistoryEntry) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, entry];
      localStorage.setItem('requestHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('requestHistory');
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
