'use client';

import React from 'react';
import type { Region } from '@/types';

interface MapRendererProps {
  regions: Region[];
  onRegionClick: (regionId: string) => void;
  isComplete: boolean;
}

export default function MapRenderer({
  regions,
  onRegionClick,
  isComplete,
}: MapRendererProps) {
  // 计算 SVG viewBox
  const viewBox = calculateViewBox(regions);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gray-50 rounded-lg overflow-hidden">
      <svg
        viewBox={viewBox}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 渲染所有区域 */}
        {regions.map((region) => {
          const fillColor = region.color || '#e5e5e5';
          const hasConflict = hasColorConflict(region, regions);

          return (
            <g
              key={region.id}
              onClick={() => onRegionClick(region.id)}
              className="cursor-pointer transition-opacity hover:opacity-80"
            >
              <path
                d={region.path}
                fill={fillColor}
                stroke={hasConflict ? '#ef4444' : '#666'}
                strokeWidth="0.5"
                className={`transition-all duration-200 ${
                  hasConflict ? 'stroke-[2]' : ''
                }`}
              />
              {/* 区域名称标签 */}
              <text
                x={getCentroid(region.path).x}
                y={getCentroid(region.path).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[3px] fill-gray-700 pointer-events-none select-none"
                style={{ fontSize: getFontSize(region.path) }}
              >
                {region.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 完成状态提示 */}
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg px-6 py-4 shadow-lg">
            <p className="text-xl font-bold text-green-600">🎉 挑战成功！</p>
            <p className="text-sm text-gray-600 mt-1">所有区域已正确涂色</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 检查区域是否有颜色冲突
 */
function hasColorConflict(region: Region, allRegions: Region[]): boolean {
  if (!region.color) return false;
  for (const neighborId of region.neighbors) {
    const neighbor = allRegions.find(r => r.id === neighborId);
    if (neighbor && neighbor.color === region.color) {
      return true;
    }
  }
  return false;
}

/**
 * 计算 SVG viewBox
 */
function calculateViewBox(regions: Region[]): string {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  regions.forEach(region => {
    const coords = parsePathCoords(region.path);
    coords.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });

  const padding = 10;
  return `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`;
}

/**
 * 解析 SVG path 坐标
 */
function parsePathCoords(path: string): [number, number][] {
  const coords: [number, number][] = [];
  const matches = path.matchAll(/M\s+(\d+)\s+(\d+)|L\s+(\d+)\s+(\d+)/g);
  for (const match of matches) {
    const x = parseFloat(match[1] || match[3] || '0');
    const y = parseFloat(match[2] || match[4] || '0');
    if (!isNaN(x) && !isNaN(y)) {
      coords.push([x, y]);
    }
  }
  return coords;
}

/**
 * 获取路径中心点
 */
function getCentroid(path: string): { x: number; y: number } {
  const coords = parsePathCoords(path);
  if (coords.length === 0) return { x: 0, y: 0 };
  
  const sumX = coords.reduce((acc, [x]) => acc + x, 0);
  const sumY = coords.reduce((acc, [y]) => acc + y, 0);
  return {
    x: sumX / coords.length,
    y: sumY / coords.length,
  };
}

/**
 * 根据区域大小计算字体大小
 */
function getFontSize(path: string): string {
  const coords = parsePathCoords(path);
  if (coords.length < 2) return '3px';
  
  const xs = coords.map(c => c[0]);
  const ys = coords.map(c => c[1]);
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  const size = Math.min(width, height) / 3;
  
  return `${Math.max(2, Math.min(5, size))}px`;
}
