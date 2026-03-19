import type { Region } from '@/types';
import { WORLD_MAP } from './world-map';

export interface MapInfo {
  id: string;
  name: string;
  description: string;
  regionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'world' | 'china' | 'province';
  parentId?: string;
}

/**
 * 中国省级行政区地图数据
 * 包含 34 个省级行政区的简化 SVG path 和邻接关系
 */
export const CHINA_MAP: Region[] = [
  // 华北地区
  { id: 'beijing', name: '北京', path: 'M 116.4 39.9 L 116.8 39.9 L 116.8 40.2 L 116.4 40.2 Z', neighbors: ['hebei', 'tianjin'] },
  { id: 'tianjin', name: '天津', path: 'M 117.2 39.1 L 117.8 39.1 L 117.8 39.5 L 117.2 39.5 Z', neighbors: ['beijing', 'hebei'] },
  { id: 'hebei', name: '河北', path: 'M 114.5 36.5 L 118.5 36.5 L 118.5 42.5 L 114.5 42.5 Z', neighbors: ['beijing', 'tianjin', 'shanxi', 'henan', 'shandong', 'liaoning', 'inner_mongolia'] },
  { id: 'shanxi', name: '山西', path: 'M 111.5 34.5 L 114.5 34.5 L 114.5 40.5 L 111.5 40.5 Z', neighbors: ['hebei', 'henan', 'shaanxi', 'inner_mongolia'] },
  { id: 'inner_mongolia', name: '内蒙古', path: 'M 97 37 L 126 37 L 126 53 L 97 53 Z', neighbors: ['heilongjiang', 'jilin', 'liaoning', 'hebei', 'shanxi', 'shaanxi', 'ningxia', 'gansu'] },
  
  // 东北地区
  { id: 'liaoning', name: '辽宁', path: 'M 118 38.5 L 125 38.5 L 125 43.5 L 118 43.5 Z', neighbors: ['hebei', 'inner_mongolia', 'jilin'] },
  { id: 'jilin', name: '吉林', path: 'M 122 41 L 131 41 L 131 46.5 L 122 46.5 Z', neighbors: ['liaoning', 'inner_mongolia', 'heilongjiang'] },
  { id: 'heilongjiang', name: '黑龙江', path: 'M 121 43.5 L 135 43.5 L 135 53.5 L 121 53.5 Z', neighbors: ['inner_mongolia', 'jilin'] },
  
  // 华东地区
  { id: 'shandong', name: '山东', path: 'M 114.8 34.5 L 122.8 34.5 L 122.8 38.5 L 114.8 38.5 Z', neighbors: ['hebei', 'henan', 'anhui', 'jiangsu'] },
  { id: 'jiangsu', name: '江苏', path: 'M 116.5 31 L 122 31 L 122 35.5 L 116.5 35.5 Z', neighbors: ['shandong', 'anhui', 'zhejiang', 'shanghai'] },
  { id: 'anhui', name: '安徽', path: 'M 114.5 29.5 L 119.5 29.5 L 119.5 34.5 L 114.5 34.5 Z', neighbors: ['shandong', 'jiangsu', 'zhejiang', 'jiangxi', 'henan', 'hubei'] },
  { id: 'zhejiang', name: '浙江', path: 'M 118 27 L 123 27 L 123 31.5 L 118 31.5 Z', neighbors: ['jiangsu', 'anhui', 'jiangxi', 'fujian'] },
  { id: 'fujian', name: '福建', path: 'M 116 23.5 L 120.5 23.5 L 120.5 28.5 L 116 28.5 Z', neighbors: ['zhejiang', 'jiangxi', 'guangdong'] },
  { id: 'jiangxi', name: '江西', path: 'M 113.5 24.5 L 118.5 24.5 L 118.5 30.5 L 113.5 30.5 Z', neighbors: ['anhui', 'zhejiang', 'fujian', 'guangdong', 'hunan', 'hubei'] },
  { id: 'shanghai', name: '上海', path: 'M 121.3 30.9 L 122 30.9 L 122 31.5 L 121.3 31.5 Z', neighbors: ['jiangsu', 'zhejiang'] },
  
  // 华中地区
  { id: 'henan', name: '河南', path: 'M 110.5 31.5 L 116.5 31.5 L 116.5 36.5 L 110.5 36.5 Z', neighbors: ['hebei', 'shanxi', 'shaanxi', 'hubei', 'anhui', 'shandong'] },
  { id: 'hubei', name: '湖北', path: 'M 108.5 29 L 116.5 29 L 116.5 33.5 L 108.5 33.5 Z', neighbors: ['henan', 'anhui', 'jiangxi', 'hunan', 'chongqing', 'shaanxi'] },
  { id: 'hunan', name: '湖南', path: 'M 108.5 24.5 L 114.5 24.5 L 114.5 30.5 L 108.5 30.5 Z', neighbors: ['hubei', 'jiangxi', 'guangdong', 'guangxi', 'guizhou', 'chongqing'] },
  
  // 华南地区
  { id: 'guangdong', name: '广东', path: 'M 109.5 20 L 117.5 20 L 117.5 25.5 L 109.5 25.5 Z', neighbors: ['fujian', 'jiangxi', 'hunan', 'guangxi', 'hainan'] },
  { id: 'guangxi', name: '广西', path: 'M 104 21 L 112 21 L 112 26.5 L 104 26.5 Z', neighbors: ['guangdong', 'hunan', 'guizhou', 'yunnan'] },
  { id: 'hainan', name: '海南', path: 'M 109 18 L 111.5 18 L 111.5 20.5 L 109 20.5 Z', neighbors: ['guangdong'] },
  
  // 西南地区
  { id: 'chongqing', name: '重庆', path: 'M 105.5 28.5 L 110.5 28.5 L 110.5 32 L 105.5 32 Z', neighbors: ['hubei', 'hunan', 'guizhou', 'sichuan', 'shaanxi'] },
  { id: 'sichuan', name: '四川', path: 'M 97 26 L 110 26 L 110 34 L 97 34 Z', neighbors: ['chongqing', 'guizhou', 'yunnan', 'tibet', 'qinghai', 'gansu', 'shaanxi'] },
  { id: 'guizhou', name: '贵州', path: 'M 103.5 24.5 L 109.5 24.5 L 109.5 29.5 L 103.5 29.5 Z', neighbors: ['chongqing', 'hunan', 'guangxi', 'yunnan', 'sichuan'] },
  { id: 'yunnan', name: '云南', path: 'M 97 21 L 106 21 L 106 29 L 97 29 Z', neighbors: ['guangxi', 'guizhou', 'sichuan', 'tibet'] },
  { id: 'tibet', name: '西藏', path: 'M 78 26 L 99 26 L 99 36 L 78 36 Z', neighbors: ['yunnan', 'sichuan', 'qinghai', 'xinjiang'] },
  
  // 西北地区
  { id: 'shaanxi', name: '陕西', path: 'M 105.5 31.5 L 111.5 31.5 L 111.5 39.5 L 105.5 39.5 Z', neighbors: ['shanxi', 'henan', 'hubei', 'chongqing', 'sichuan', 'gansu', 'ningxia', 'inner_mongolia'] },
  { id: 'gansu', name: '甘肃', path: 'M 92 32 L 108 32 L 108 42 L 92 42 Z', neighbors: ['inner_mongolia', 'ningxia', 'shaanxi', 'sichuan', 'qinghai', 'xinjiang'] },
  { id: 'qinghai', name: '青海', path: 'M 89 31 L 103 31 L 103 39 L 89 39 Z', neighbors: ['gansu', 'sichuan', 'tibet', 'xinjiang'] },
  { id: 'ningxia', name: '宁夏', path: 'M 104.5 35 L 107.5 35 L 107.5 39 L 104.5 39 Z', neighbors: ['inner_mongolia', 'gansu', 'shaanxi'] },
  { id: 'xinjiang', name: '新疆', path: 'M 73 34 L 96 34 L 96 49 L 73 49 Z', neighbors: ['gansu', 'qinghai', 'tibet'] },
];

/**
 * 简化版地图（用于演示，9 个区域）
 */
export const SIMPLE_MAP: Region[] = [
  { id: 'r1', name: '区域 1', path: 'M 10 10 L 50 10 L 50 50 L 10 50 Z', neighbors: ['r2', 'r4', 'r5'] },
  { id: 'r2', name: '区域 2', path: 'M 50 10 L 90 10 L 90 50 L 50 50 Z', neighbors: ['r1', 'r3', 'r5', 'r6'] },
  { id: 'r3', name: '区域 3', path: 'M 90 10 L 130 10 L 130 50 L 90 50 Z', neighbors: ['r2', 'r6', 'r7'] },
  { id: 'r4', name: '区域 4', path: 'M 10 50 L 50 50 L 50 90 L 10 90 Z', neighbors: ['r1', 'r5', 'r8'] },
  { id: 'r5', name: '区域 5', path: 'M 50 50 L 90 50 L 90 90 L 50 90 Z', neighbors: ['r1', 'r2', 'r4', 'r6', 'r8', 'r9'] },
  { id: 'r6', name: '区域 6', path: 'M 90 50 L 130 50 L 130 90 L 90 90 Z', neighbors: ['r2', 'r3', 'r5', 'r7', 'r9'] },
  { id: 'r7', name: '区域 7', path: 'M 130 10 L 170 10 L 170 50 L 130 50 Z', neighbors: ['r3', 'r6'] },
  { id: 'r8', name: '区域 8', path: 'M 10 90 L 50 90 L 50 130 L 10 130 Z', neighbors: ['r4', 'r5', 'r9'] },
  { id: 'r9', name: '区域 9', path: 'M 50 90 L 90 90 L 90 130 L 50 130 Z', neighbors: ['r5', 'r6', 'r8'] },
];

/**
 * 获取地图数据
 */
export function getMapData(mapId: string): Region[] {
  switch (mapId) {
    case 'world':
      return WORLD_MAP;
    case 'china':
      return CHINA_MAP;
    case 'simple':
    default:
      return SIMPLE_MAP;
  }
}

/**
 * 获取所有可用地图列表
 */
export function getAvailableMaps(): MapInfo[] {
  return [
    {
      id: 'simple',
      name: '练习地图',
      description: '9个区域，适合初学者',
      regionCount: SIMPLE_MAP.length,
      difficulty: 'easy',
      category: 'world',
    },
    {
      id: 'world',
      name: '世界地图',
      description: '主要国家，认识世界',
      regionCount: WORLD_MAP.length,
      difficulty: 'medium',
      category: 'world',
    },
    {
      id: 'china',
      name: '中国地图',
      description: '34个省级行政区',
      regionCount: CHINA_MAP.length,
      difficulty: 'hard',
      category: 'china',
    },
  ];
}

/**
 * 根据类别获取地图
 */
export function getMapsByCategory(category: 'world' | 'china' | 'province'): MapInfo[] {
  return getAvailableMaps().filter(map => map.category === category);
}
