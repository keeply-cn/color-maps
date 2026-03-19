'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Region, GameState } from '@/types';
import { FOUR_COLORS } from '@/types';
import { isGameComplete, validateFourColor, getHint, calculateProgress } from '@/services/four-color';
import { isUnsolvableState } from '@/services/adjacency';
import { saveGame, loadGame } from '@/services/db';

const COLORS = FOUR_COLORS.map(c => c.value);

export function useGameState(mapId: string, initialRegions: Region[]) {
  const [regions, setRegions] = useState<Region[]>(() => 
    initialRegions.map(r => ({ ...r, color: r.color ?? null }))
  );
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [prevComplete, setPrevComplete] = useState(false);
  const [isUnsolvable, setIsUnsolvable] = useState(false);

  // 加载存档
  useEffect(() => {
    loadGame(mapId).then(savedState => {
      if (savedState) {
        setRegions(savedState.regions.map(r => ({ ...r, color: r.color ?? null })));
        setSelectedColor(savedState.selectedColor);
        setMoves(savedState.moves);
        setStartTime(savedState.startTime);
        setEndTime(savedState.endTime);
        setIsComplete(savedState.isComplete);
        setPrevComplete(savedState.isComplete);
      }
    });
  }, [mapId]);

  // 自动保存
  useEffect(() => {
    const gameState: GameState = {
      regions,
      selectedColor,
      isComplete,
      moves,
      startTime,
      endTime,
    };
    saveGame(mapId, gameState);
  }, [regions, selectedColor, isComplete, moves, startTime, endTime, mapId]);

  // 检查游戏状态
  useEffect(() => {
    const complete = isGameComplete(regions);
    if (complete && !isComplete) {
      setIsComplete(true);
      setPrevComplete(false);
      if (!endTime) {
        setEndTime(Date.now());
      }
    } else if (!complete && isComplete) {
      setIsComplete(false);
      setPrevComplete(true);
    }

    // 检查是否无解
    if (!complete && !isUnsolvable) {
      const unsolvable = isUnsolvableState(regions, COLORS);
      setIsUnsolvable(unsolvable);
    } else if (isUnsolvable && complete) {
      setIsUnsolvable(false);
    }
  }, [regions, endTime, isComplete, isUnsolvable]);

  // 处理区域点击
  const handleRegionClick = useCallback((regionId: string) => {
    if (isComplete) return;

    setRegions(prev => prev.map(region => {
      if (region.id === regionId) {
        return { ...region, color: selectedColor };
      }
      return region;
    }));

    setMoves(prev => {
      const newMoves = prev + 1;
      if (prev === 0) {
        setStartTime(Date.now());
      }
      return newMoves;
    });
  }, [selectedColor, isComplete]);

  // 重置游戏
  const resetGame = useCallback(() => {
    setRegions(initialRegions.map(r => ({ ...r, color: null })));
    setSelectedColor(COLORS[0]);
    setMoves(0);
    setStartTime(null);
    setEndTime(null);
    setIsComplete(false);
    setPrevComplete(false);
    setIsUnsolvable(false);
  }, [initialRegions]);

  // 获取提示
  const getGameHint = useCallback(() => {
    return getHint(regions);
  }, [regions]);

  // 获取进度
  const progress = calculateProgress(regions);

  // 获取冲突信息
  const validation = validateFourColor(regions);

  return {
    regions,
    selectedColor,
    setSelectedColor,
    moves,
    startTime,
    endTime,
    isComplete,
    prevComplete,
    isUnsolvable,
    progress,
    hasConflict: !validation.valid,
    conflicts: validation.conflicts,
    handleRegionClick,
    resetGame,
    getHint: getGameHint,
  };
}
