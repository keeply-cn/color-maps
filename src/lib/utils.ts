/**
 * 检查两个颜色是否相同
 */
export function isSameColor(color1: string | null, color2: string | null): boolean {
  return color1 === color2;
}

/**
 * 检查区域是否可以涂指定颜色（不与相邻区域冲突）
 */
export function canColorRegion(region: { neighbors: string[]; color: string | null }, 
                              allRegions: Map<string, { color: string | null }>, 
                              newColor: string): boolean {
  for (const neighborId of region.neighbors) {
    const neighbor = allRegions.get(neighborId);
    if (neighbor && neighbor.color === newColor) {
      return false;
    }
  }
  return true;
}

/**
 * 检查游戏是否完成（所有区域都已涂色且无冲突）
 */
export function isGameComplete(regions: Array<{ color: string | null }>): boolean {
  return regions.every(region => region.color !== null);
}

/**
 * 检查当前涂色是否有冲突
 */
export function hasColorConflict(regions: Array<{ id: string; color: string | null; neighbors: string[] }>): boolean {
  for (const region of regions) {
    if (!region.color) continue;
    for (const neighborId of region.neighbors) {
      const neighbor = regions.find(r => r.id === neighborId);
      if (neighbor && neighbor.color === region.color) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 格式化时间
 */
export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
