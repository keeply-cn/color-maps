import type { Region } from '@/types';
import { FOUR_COLORS } from '@/types';

/**
 * 四色定理验证引擎
 * 基于四色定理：任何平面地图最多只需要四种颜色就能使相邻区域颜色不同
 */

const COLOR_VALUES = FOUR_COLORS.map(c => c.value);

/**
 * 验证当前涂色是否符合四色定理（无相邻同色）
 */
export function validateFourColor(regions: Region[]): {
  valid: boolean;
  conflicts: Array<{ region1: string; region2: string }>;
} {
  const conflicts: Array<{ region1: string; region2: string }> = [];
  const regionMap = new Map(regions.map(r => [r.id, r]));

  for (const region of regions) {
    if (!region.color) continue;
    
    for (const neighborId of region.neighbors) {
      const neighbor = regionMap.get(neighborId);
      if (neighbor && neighbor.color === region.color) {
        // 避免重复报告
        const pair = [region.id, neighbor.id].sort().join('-');
        if (!conflicts.some(c => [c.region1, c.region2].sort().join('-') === pair)) {
          conflicts.push({
            region1: region.name,
            region2: neighbor.name,
          });
        }
      }
    }
  }

  return {
    valid: conflicts.length === 0,
    conflicts,
  };
}

/**
 * 检查地图是否完全涂色
 */
export function isFullyColored(regions: Region[]): boolean {
  return regions.every(r => r.color !== null);
}

/**
 * 检查游戏是否完成（完全涂色且无冲突）
 */
export function isGameComplete(regions: Region[]): boolean {
  return isFullyColored(regions) && validateFourColor(regions).valid;
}

/**
 * 获取推荐的下一次涂色（提示功能）
 */
export function getHint(regions: Region[]): { regionId: string; color: string } | null {
  const uncoloredRegions = regions.filter(r => !r.color);
  if (uncoloredRegions.length === 0) return null;

  // 找出约束最多的区域（邻居最多已涂色的）
  let bestRegion: Region | null = null;
  let maxColoredNeighbors = -1;

  for (const region of uncoloredRegions) {
    const coloredNeighborCount = region.neighbors.filter(
      neighborId => regions.find(r => r.id === neighborId)?.color !== null
    ).length;
    
    if (coloredNeighborCount > maxColoredNeighbors) {
      maxColoredNeighbors = coloredNeighborCount;
      bestRegion = region;
    }
  }

  if (!bestRegion) return null;

  // 找出可用颜色
  const usedColors = new Set(
    bestRegion.neighbors
      .map(id => regions.find(r => r.id === id)?.color)
      .filter((c): c is string => c !== null)
  );

  const availableColor = COLOR_VALUES.find(c => !usedColors.has(c));
  if (!availableColor) return null;

  return {
    regionId: bestRegion.id,
    color: availableColor,
  };
}

/**
 * 计算当前涂色进度
 */
export function calculateProgress(regions: Region[]): number {
  const coloredCount = regions.filter(r => r.color !== null).length;
  return Math.round((coloredCount / regions.length) * 100);
}

/**
 * 统计每种颜色的使用次数
 */
export function countColorUsage(regions: Region[]): Map<string, number> {
  const usage = new Map<string, number>();
  COLOR_VALUES.forEach(c => usage.set(c, 0));
  
  regions.forEach(r => {
    if (r.color) {
      usage.set(r.color, (usage.get(r.color) || 0) + 1);
    }
  });
  
  return usage;
}
