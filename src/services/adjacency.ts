import type { Region } from '@/types';

/**
 * 邻接关系计算引擎
 * 用于验证和计算地图区域之间的邻接关系
 */

/**
 * 验证邻接关系是否正确（双向检查）
 */
export function validateAdjacency(regions: Region[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const regionMap = new Map(regions.map(r => [r.id, r]));

  for (const region of regions) {
    for (const neighborId of region.neighbors) {
      const neighbor = regionMap.get(neighborId);
      if (!neighbor) {
        errors.push(`区域 "${region.name}" 的邻居 "${neighborId}" 不存在`);
        continue;
      }
      // 检查双向关系
      if (!neighbor.neighbors.includes(region.id)) {
        errors.push(`区域 "${region.name}" 和 "${neighbor.name}" 的邻接关系不是双向的`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 获取区域的所有邻居
 */
export function getNeighbors(region: Region, allRegions: Region[]): Region[] {
  const regionMap = new Map(allRegions.map(r => [r.id, r]));
  return region.neighbors
    .map(id => regionMap.get(id))
    .filter((r): r is Region => r !== undefined);
}

/**
 * 获取区域可用的颜色（不与邻居冲突）
 */
export function getAvailableColors(
  region: Region,
  allRegions: Region[],
  availableColors: string[]
): string[] {
  const neighbors = getNeighbors(region, allRegions);
  const usedColors = new Set(neighbors.map(n => n.color).filter((c): c is string => c !== null));
  
  return availableColors.filter(color => !usedColors.has(color));
}

/**
 * 检查地图是否可解（使用回溯算法）
 */
export function isMapSolvable(regions: Region[], colors: string[]): boolean {
  const assignment = new Map<string, string>();
  
  function backtrack(index: number): boolean {
    if (index >= regions.length) return true;
    
    const region = regions[index];
    const availableColors = getAvailableColorsForAssignment(region, regions, colors, assignment);
    
    for (const color of availableColors) {
      assignment.set(region.id, color);
      if (backtrack(index + 1)) return true;
      assignment.delete(region.id);
    }
    
    return false;
  }
  
  return backtrack(0);
}

/**
 * 为回溯算法获取可用颜色
 */
function getAvailableColorsForAssignment(
  region: Region,
  allRegions: Region[],
  colors: string[],
  assignment: Map<string, string>
): string[] {
  const usedColors = new Set<string>();
  
  for (const neighborId of region.neighbors) {
    const assignedColor = assignment.get(neighborId);
    if (assignedColor) {
      usedColors.add(assignedColor);
    }
  }
  
  return colors.filter(color => !usedColors.has(color));
}

/**
 * 计算当前地图的色数（最少需要几种颜色）
 */
export function calculateChromaticNumber(regions: Region[]): number {
  const colors = ['#1', '#2', '#3', '#4', '#5', '#6'];
  
  for (let numColors = 1; numColors <= 4; numColors++) {
    if (isMapSolvable(regions, colors.slice(0, numColors))) {
      return numColors;
    }
  }
  
  return 4; // 根据四色定理，平面图最多需要 4 种颜色
}

/**
 * 检测当前涂色状态是否无解
 */
export function isUnsolvableState(regions: Region[], colors: string[]): boolean {
  // 找出未涂色的区域
  const uncoloredRegions = regions.filter(r => !r.color);
  if (uncoloredRegions.length === 0) return false;
  
  // 检查是否有未涂色区域没有任何可用颜色
  for (const region of uncoloredRegions) {
    const availableColors = getAvailableColors(region, regions, colors);
    if (availableColors.length === 0) {
      return true;
    }
  }
  
  return false;
}
