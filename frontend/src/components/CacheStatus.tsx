"use client";

import React, { useState, useEffect } from 'react';

interface CacheStatusProps {
  className?: string;
}

export default function CacheStatus({ className = "" }: CacheStatusProps) {
  const [cacheCount, setCacheCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    const updateCacheInfo = () => {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith('deadball_cache_'));
      let count = 0;
      let size = 0;

      cacheKeys.forEach(key => {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const entry = JSON.parse(cached);
            const now = Date.now();
            // Check if cache is still valid (6 hours)
            if (now - entry.timestamp < 6 * 60 * 60 * 1000) {
              count++;
              size += new Blob([cached]).size;
            }
          }
        } catch {
          // Ignore invalid cache entries
        }
      });

      setCacheCount(count);
      setTotalSize(size);
    };

    updateCacheInfo();
    // Update every 30 seconds
    const interval = setInterval(updateCacheInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (cacheCount === 0) {
    return null; // Don't show anything if no cache
  }

  return (
    <div className={`flex items-center gap-2 text-xs text-gray-500 ${className}`}>
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      <span>Cache: {cacheCount} items ({formatSize(totalSize)})</span>
    </div>
  );
} 