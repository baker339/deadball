// Cache utility for managing localStorage-based caching
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}

export interface CacheConfig {
  duration: number; // Cache duration in milliseconds
  version: string; // Cache version for invalidation
  key: string; // Cache key
}

class CacheManager {
  private static instance: CacheManager;
  private cachePrefix = 'deadball_cache_';
  private defaultDuration = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private getFullKey(key: string): string {
    return `${this.cachePrefix}${key}`;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  get<T>(key: string, config?: Partial<CacheConfig>): T | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    try {
      const fullKey = this.getFullKey(key);
      const cached = localStorage.getItem(fullKey);
      
      if (!cached) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();
      const duration = config?.duration || this.defaultDuration;
      const version = config?.version || '1.0';

      // Check if cache is expired or version is outdated
      if (now - entry.timestamp > duration || entry.version !== version) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to read cache:', error);
      this.remove(key);
      return null;
    }
  }

  set<T>(key: string, data: T, config?: Partial<CacheConfig>): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      const fullKey = this.getFullKey(key);
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        version: config?.version || '1.0'
      };

      localStorage.setItem(fullKey, JSON.stringify(entry));
      return true;
    } catch (error) {
      console.warn('Failed to save cache:', error);
      return false;
    }
  }

  remove(key: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      const fullKey = this.getFullKey(key);
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.warn('Failed to remove cache:', error);
      return false;
    }
  }

  clear(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.cachePrefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.warn('Failed to clear cache:', error);
      return false;
    }
  }

  getCacheInfo(key: string): { exists: boolean; age: number | null; size: number | null } {
    if (!this.isLocalStorageAvailable()) {
      return { exists: false, age: null, size: null };
    }

    try {
      const fullKey = this.getFullKey(key);
      const cached = localStorage.getItem(fullKey);
      
      if (!cached) {
        return { exists: false, age: null, size: null };
      }

      const entry: CacheEntry<any> = JSON.parse(cached);
      const age = Date.now() - entry.timestamp;
      const size = new Blob([cached]).size;

      return { exists: true, age, size };
    } catch {
      return { exists: false, age: null, size: null };
    }
  }
}

export const cacheManager = CacheManager.getInstance();

// Convenience functions for common cache operations
export const cacheUtils = {
  // Cache key generators
  keys: {
    dragVsHR: (granularity: string) => `drag_vs_hr_${granularity}_v2.1`,
    juicedVsDead: (granularity: string) => `juiced_vs_dead_${granularity}_v2.1`,
    exitVelocity: (sampleSize: number) => `exit_velocity_${sampleSize}_v2.1`,
    expectedVsActual: () => `expected_vs_actual_v2.1`,
    pitchVsExitVelocity: (filters: string) => `pitch_vs_exit_${filters}_v2.1`,
  },

  // Cache configurations
  configs: {
    charts: {
      duration: 6 * 60 * 60 * 1000, // 6 hours for charts
      version: '2.1'
    },
    data: {
      duration: 24 * 60 * 60 * 1000, // 24 hours for raw data
      version: '2.1'
    }
  },

  // Helper to create cache key from URL parameters
  createKeyFromParams: (baseKey: string, params: Record<string, any>): string => {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${baseKey}_${sortedParams}`;
  }
}; 