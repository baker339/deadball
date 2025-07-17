import { useState, useEffect, useCallback } from 'react';
import { cacheManager, cacheUtils, CacheConfig } from '../utils/cache';

interface UseCachedDataOptions {
  cacheKey: string;
  cacheConfig?: Partial<CacheConfig>;
  fetchFunction: () => Promise<any>;
  dependencies?: any[];
  skipCache?: boolean;
  onSuccess?: (data: any) => void;
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
}: UseCachedDataOptions): UseCachedDataReturn<T> {
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
  params: Record<string, any> = {},
  options: Partial<UseCachedDataOptions> = {}
): UseCachedDataReturn<T> {
  const cacheKey = cacheUtils.createKeyFromParams(endpoint, params);
  
  const fetchFunction = async (): Promise<T> => {
    const url = new URL(`http://localhost:8000${endpoint}`);
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