import { useState, useEffect, useCallback } from 'react';
import { cacheManager, cacheUtils, CacheConfig } from '../utils/cache';

interface UseCachedDataOptions<T> {
  cacheKey: string;
  cacheConfig?: Partial<CacheConfig>;
  fetchFunction: () => Promise<T>;
  dependencies?: unknown[];
  skipCache?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseCachedDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: number;
  refetch: () => Promise<void>;
  cacheInfo: {
    exists: boolean;
    age: number | null;
    size: number | null;
  };
}

export function useCachedData<T>({
  cacheKey,
  cacheConfig,
  fetchFunction,
  dependencies = [],
  skipCache = false,
  onSuccess,
  onError
}: UseCachedDataOptions<T>): UseCachedDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const fetchData = useCallback(async (useCache: boolean = true) => {
    try {
      setLoading(true);
      setError(null);

      // Try to get cached data first
      if (useCache && !skipCache) {
        const cachedData = cacheManager.get<T>(cacheKey, cacheConfig);
        if (cachedData) {
          setData(cachedData);
          setLastFetch(Date.now());
          setLoading(false);
          onSuccess?.(cachedData);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetchFunction();
      
      // Cache the data
      if (!skipCache) {
        cacheManager.set(cacheKey, freshData, cacheConfig);
      }

      setData(freshData);
      setLastFetch(Date.now());
      onSuccess?.(freshData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [cacheKey, cacheConfig, fetchFunction, skipCache, onSuccess, onError]);

  const refetch = useCallback(async () => {
    await fetchData(false); // Force fresh data
  }, [fetchData]);

  // Get cache info
  const cacheInfo = cacheManager.getCacheInfo(cacheKey);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    loading,
    error,
    lastFetch,
    refetch,
    cacheInfo
  };
}

// Convenience hook for API endpoints
export function useCachedAPI<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options: Partial<UseCachedDataOptions<T>> = {}
): UseCachedDataReturn<T> {
  const cacheKey = cacheUtils.createKeyFromParams(endpoint, params);
  
  const fetchFunction = async (): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    const url = new URL(`${baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data || result;
  };

  return useCachedData<T>({
    cacheKey,
    cacheConfig: cacheUtils.configs.charts,
    fetchFunction,
    dependencies: [endpoint, JSON.stringify(params)],
    ...options
  });
} 