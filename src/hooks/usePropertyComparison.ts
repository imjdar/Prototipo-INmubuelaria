/**
 * CUSTOM HOOK: Property Comparison Matrix State
 * Follows Single Responsibility Principle (SRP)
 * Encapsulates the 3-property heuristic limit and tray management.
 */

import { useState, useCallback } from 'react';
import { Property } from '../types/property';

export const MAX_COMPARE_LIMIT = 3;

export function usePropertyComparison() {
  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>([]);

  const toggleCompare = useCallback((property: Property): { success: boolean; isAdded: boolean; count: number } => {
    let result = { success: true, isAdded: false, count: 0 };

    setComparedPropertyIds((prev) => {
      if (prev.includes(property.id)) {
        result = { success: true, isAdded: false, count: prev.length - 1 };
        return prev.filter((id) => id !== property.id);
      } else {
        if (prev.length >= MAX_COMPARE_LIMIT) {
          result = { success: false, isAdded: false, count: prev.length };
          return prev;
        }
        result = { success: true, isAdded: true, count: prev.length + 1 };
        return [...prev, property.id];
      }
    });

    return result;
  }, []);

  const removeProperty = useCallback((id: string) => {
    setComparedPropertyIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setComparedPropertyIds([]);
  }, []);

  const loadPropertiesForCompare = useCallback((ids: string[]) => {
    setComparedPropertyIds(ids.slice(0, MAX_COMPARE_LIMIT));
  }, []);

  return {
    comparedPropertyIds,
    toggleCompare,
    removeProperty,
    clearCompare,
    loadPropertiesForCompare
  };
}
