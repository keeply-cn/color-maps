// 地图区域类型
export interface Region {
  id: string;
  name: string;
  path: string; // SVG path
  neighbors: string[]; // 相邻区域 ID 列表
  color?: string | null; // 当前颜色（可选）
}

// 游戏状态类型
export interface GameState {
  regions: Region[];
  selectedColor: string;
  isComplete: boolean;
  moves: number;
  startTime: number | null;
  endTime: number | null;
}

// 颜色配置
export interface ColorConfig {
  id: string;
  name: string;
  value: string;
  tailwindClass: string;
}

// 可用的四种颜色
export const FOUR_COLORS: ColorConfig[] = [
  { id: 'red', name: '红色', value: '#ef4444', tailwindClass: 'bg-red-500' },
  { id: 'green', name: '绿色', value: '#22c55e', tailwindClass: 'bg-green-500' },
  { id: 'blue', name: '蓝色', value: '#3b82f6', tailwindClass: 'bg-blue-500' },
  { id: 'yellow', name: '黄色', value: '#eab308', tailwindClass: 'bg-yellow-500' },
];
