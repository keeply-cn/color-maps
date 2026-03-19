'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MapRenderer from '@/components/MapRenderer';
import ColorPicker from '@/components/ColorPicker';
import GameInfo from '@/components/GameInfo';
import { useGameState } from '@/hooks/useGameState';
import { getMapData, getAvailableMaps } from '@/data/maps';

export default function GamePage() {
  const params = useParams();
  const mapId = (params.mapId as string) || 'simple';
  
  const initialRegions = getMapData(mapId);
  const {
    regions,
    selectedColor,
    setSelectedColor,
    moves,
    startTime,
    isComplete,
    isUnsolvable,
    progress,
    hasConflict,
    handleRegionClick,
    resetGame,
    getHint: getGameHint,
  } = useGameState(mapId, initialRegions);

  const [isEraserActive, setIsEraserActive] = useState(false);
  const [highlightRegion, setHighlightRegion] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 计时器
  useEffect(() => {
    if (!startTime || isComplete) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  // 处理区域点击
  const handleRegionClickWrapper = (regionId: string) => {
    if (isEraserActive) {
      const region = regions.find(r => r.id === regionId);
      if (region && region.color) {
        handleRegionClick(regionId);
      }
    } else {
      handleRegionClick(regionId);
    }
  };

  // 使用提示
  const handleHint = () => {
    const hint = getGameHint();
    if (hint) {
      setHighlightRegion(hint.regionId);
      setTimeout(() => setHighlightRegion(null), 3000);
    }
  };

  // 切换橡皮擦
  const toggleEraser = () => {
    setIsEraserActive(!isEraserActive);
  };

  const maps = getAvailableMaps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🎨 Color Maps
          </h1>
          <p className="text-gray-600">四色定理地图涂色游戏</p>
        </header>

        <div className="mb-4 flex justify-center gap-2">
          {maps.map(map => (
            <a
              key={map.id}
              href={`/game/${map.id}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mapId === map.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {map.name}
            </a>
          ))}
        </div>

        <GameInfo
          moves={moves}
          progress={progress}
          isComplete={isComplete}
          isUnsolvable={isUnsolvable}
          hasConflict={hasConflict}
          elapsedTime={elapsedTime}
          onHint={handleHint}
          onReset={resetGame}
          canUseHint={!isComplete}
        />

        <div className="mt-4">
          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            isEraserActive={isEraserActive}
            onEraserToggle={toggleEraser}
          />
        </div>

        <div className="mt-4">
          <MapRenderer
            regions={regions.map(r => 
              highlightRegion === r.id 
                ? { ...r, color: r.color || '#fef08a' } 
                : r
            )}
            onRegionClick={handleRegionClickWrapper}
            isComplete={isComplete}
          />
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-2">📖 游戏规则</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 使用 4 种或更少颜色为地图涂色</li>
            <li>• 相邻区域不能使用相同颜色</li>
            <li>• 所有区域都正确涂色即挑战成功</li>
            <li>• 点击区域涂色，使用橡皮擦清除颜色</li>
            <li>• 遇到困难可以点击 &quot;提示&quot; 获取建议</li>
          </ul>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>基于四色定理 · 任何平面地图最多只需四种颜色</p>
        </footer>
      </div>
    </div>
  );
}
