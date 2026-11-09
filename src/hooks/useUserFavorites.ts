/**
 * CUSTOM HOOK: Multi-User Isolated Favorites Storage
 * Follows Single Responsibility Principle (SRP) and Open/Closed Principle (OCP).
 * Guarantees that concurrent users (Agent, Buyer, Admin, Guest) maintain their own independent portfolios.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'valle_urbe_saved_favorites_';

export function useUserFavorites(userId?: string | null) {
  const storageKey = `${STORAGE_PREFIX}${userId || 'guest'}`;

  // Hydrate favorites from user-scoped storage key
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading scoped favorites:', e);
    }
    // Default initial seeds per user role
    if (userId?.includes('agent')) return ['VU-CUM-048', 'VU-PUE-019'];
    if (userId?.includes('buyer')) return ['VU-CAR-005', 'VU-GON-012'];
    return ['VU-CUM-048', 'VU-GON-012'];
  });

  // Re-hydrate when userId changes (switching demo users or logging in/out)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSavedPropertyIds(parsed);
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Error re-hydrating user favorites:', e);
    }
    if (userId?.includes('agent')) setSavedPropertyIds(['VU-CUM-048', 'VU-PUE-019']);
    else if (userId?.includes('buyer')) setSavedPropertyIds(['VU-CAR-005', 'VU-GON-012']);
    else setSavedPropertyIds(['VU-CUM-048', 'VU-GON-012']);
  }, [storageKey, userId]);

  // Persist to user-scoped storage key on mutation
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(savedPropertyIds));
      }
    } catch (e) {
      console.warn('Error persisting user favorites:', e);
    }
  }, [storageKey, savedPropertyIds]);

  const toggleFavorite = useCallback((id: string): { isAdded: boolean } => {
    let added = false;
    setSavedPropertyIds((prev) => {
      if (prev.includes(id)) {
        added = false;
        return prev.filter((item) => item !== id);
      } else {
        added = true;
        return [...prev, id];
      }
    });
    return { isAdded: added };
  }, []);

  const clearFavorites = useCallback(() => {
    setSavedPropertyIds([]);
  }, []);

  return {
    savedPropertyIds,
    toggleFavorite,
    clearFavorites
  };
}
