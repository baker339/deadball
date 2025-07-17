"use client";

import React, { useState, useEffect } from 'react';
import { cacheManager } from '../utils/cache';

interface CacheInfo {
  key: string;
  exists: boolean;
  age: number | null;
  size: number | null;
}

export default function CacheManager() {
  const [cacheInfos, setCacheInfos] = useState<CacheInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const commonCacheKeys = [
    'drag_vs_hr_month_v2.1',
    'drag_vs_hr_year_v2.1',
    'juiced_vs_dead_month_v2.1',
    'juiced_vs_dead_year_v2.1',
    'exit_velocity_1000_v2.1',
    'expected_vs_actual_v2.1',
    'pitch_vs_exit_velocity_start_date=2015-01-01&end_date=2025-01-01&min_release_speed=30&max_release_speed=110&min_launch_speed=40&max_launch_speed=130_v2.1'
  ];

  useEffect(() => {
    if (isOpen) {
      const infos = commonCacheKeys.map(key => ({
        key,
        ...cacheManager.getCacheInfo(key)
      }));
      setCacheInfos(infos);
    }
  }, [isOpen]);

  const clearAllCache = () => {
    if (confirm('Are you sure you want to clear all cached data? This will force fresh data to be loaded on next visit.')) {
      cacheManager.clear();
      setCacheInfos(commonCacheKeys.map(key => ({
        key,
        exists: false,
        age: null,
        size: null
      })));
    }
  };

  const clearSpecificCache = (key: string) => {
    if (confirm(`Clear cache for "${key}"?`)) {
      cacheManager.remove(key);
      setCacheInfos(prev => prev.map(info => 
        info.key === key 
          ? { ...info, exists: false, age: null, size: null }
          : info
      ));
    }
  };

  const formatAge = (age: number | null): string => {
    if (age === null) return 'N/A';
    const minutes = Math.floor(age / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const formatSize = (size: number | null): string => {
    if (size === null) return 'N/A';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const totalSize = cacheInfos.reduce((sum, info) => sum + (info.size || 0), 0);
  const cachedCount = cacheInfos.filter(info => info.exists).length;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        title="Cache Manager"
      >
        📊
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Cache Manager</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded">
            <div className="flex justify-between text-sm">
              <span>Cached items: {cachedCount}/{cacheInfos.length}</span>
              <span>Total size: {formatSize(totalSize)}</span>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {cacheInfos.map((info) => (
              <div key={info.key} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate" title={info.key}>
                    {info.key.replace('_v2', '').replace(/_/g, ' ')}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {info.exists ? (
                      <>
                        Age: {formatAge(info.age)} • Size: {formatSize(info.size)}
                      </>
                    ) : (
                      'Not cached'
                    )}
                  </div>
                </div>
                {info.exists && (
                  <button
                    onClick={() => clearSpecificCache(info.key)}
                    className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Clear
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={clearAllCache}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Clear All Cache
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Cache helps pages load faster. Clearing will force fresh data on next visit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 