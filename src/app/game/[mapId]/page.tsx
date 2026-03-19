'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MapRenderer from '@/components/MapRenderer';
import ColorPicker from '@/components/ColorPicker';
import GameInfo from '@/components/GameInfo';
import VictoryModal from '@/components/VictoryModal';
import { useGameState } from '@/hooks/useGameState';
import { getMapData, getAvailableMaps } from '@/data/maps';
import { getAudioService } from '@/services/audio';

export default function GamePage() {
  const params = useParams();
  const mapId = (params.mapId as string) || 'simple';
  
  const initialRegions = getMapData(mapId);
  const audioService = getAudioService();
  
  const {
    regions,
    selectedColor,
    setSelectedColor,
    moves,
    startTime,
    prevComplete,
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
  const [showVictory, setShowVictory] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const maps = getAvailableMaps();
  const currentMap = maps.find(m => m.id === mapId);

  // 计时器
  useEffect(() => {
    if (!startTime || isComplete) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  // 胜利检测和音效
  useEffect(() => {
    if (isComplete && !prevComplete) {
      setShowVictory(true);
      audioService.playVictory();
    }
  }, [isComplete, prevComplete, audioService]);

  // 无解检测音效
  useEffect(() => {
    if (isUnsolvable) {
      audioService.playNoSolution();
    }
  }, [isUnsolvable, audioService]);

  // 处理区域点击
  const handleRegionClickWrapper = (regionId: string) => {
    if (isComplete) return;

    if (isEraserActive) {
      const region = regions.find(r => r.id === regionId);
      if (region && region.color) {
        handleRegionClick(regionId);
        audioService.playClick();
      }
    } else {
      handleRegionClick(regionId);
      audioService.playClick();
      
      // 检查是否有冲突
      const region = regions.find(r => r.id === regionId);
      if (region) {
        const hasConflictAfter = region.neighbors.some(
          neighborId => regions.find(r => r.id === neighborId)?.color === selectedColor
        );
        if (hasConflictAfter) {
          audioService.playError();
        }
      }
    }
  };

  // 使用提示
  const handleHint = () => {
    const hint = getGameHint();
    if (hint) {
      setHighlightRegion(hint.regionId);
      setTimeout(() => setHighlightRegion(null), 3000);
      audioService.playClick();
    }
  };

  // 切换橡皮擦
  const toggleEraser = () => {
    setIsEraserActive(!isEraserActive);
    audioService.playClick();
  };

  // 切换音效
  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    audioService.setEnabled(newState);
  };

  // 重置游戏
  const handleReset = () => {
    resetGame();
    setShowVictory(false);
    setElapsedTime(0);
    audioService.playClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航栏 */}
        <header className="mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 hover:text-blue-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium hidden sm:inline">返回首页</span>
            </Link>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {currentMap?.name || '地图涂色'}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                {currentMap?.description}
              </p>
            </div>

            {/* 音效开关 */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                audioEnabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
              title={audioEnabled ? '关闭音效' : '开启音效'}
            >
              {audioEnabled ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-sm font-medium hidden md:inline">
                {audioEnabled ? '音效' : '静音'}
              </span>
            </button>
          </div>
        </header>

        {/* 地图切换（移动端优化） */}
        <div className="mb-3 md:mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {maps.map(map => (
              <Link
                key={map.id}
                href={`/game/${map.id}`}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  mapId === map.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {map.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 游戏信息面板 */}
        <GameInfo
          moves={moves}
          progress={progress}
          isComplete={isComplete}
          isUnsolvable={isUnsolvable}
          hasConflict={hasConflict}
          elapsedTime={elapsedTime}
          onHint={handleHint}
          onReset={handleReset}
          canUseHint={!isComplete}
        />

        {/* 颜色选择器 */}
        <div className="mt-4">
          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            isEraserActive={isEraserActive}
            onEraserToggle={toggleEraser}
          />
        </div>

        {/* 地图渲染区域 */}
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

        {/* 游戏规则 */}
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

        {/* 页脚 */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>基于四色定理 · 任何平面地图最多只需四种颜色</p>
        </footer>
      </div>

      {/* 胜利弹窗 */}
      <VictoryModal
        show={showVictory}
        moves={moves}
        elapsedTime={elapsedTime}
        onClose={handleReset}
      />
    </div>
  );
}
