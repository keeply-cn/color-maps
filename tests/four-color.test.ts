import { describe, it, expect } from 'vitest';
import { validateFourColor, isFullyColored, isGameComplete, calculateProgress } from '@/services/four-color';
import type { Region } from '@/types';

const testRegions: Region[] = [
  { id: 'r1', name: '区域 1', path: 'M 0 0 L 10 0 L 10 10 L 0 10 Z', neighbors: ['r2', 'r3'], color: null },
  { id: 'r2', name: '区域 2', path: 'M 10 0 L 20 0 L 20 10 L 10 10 Z', neighbors: ['r1', 'r3'], color: null },
  { id: 'r3', name: '区域 3', path: 'M 0 10 L 10 10 L 10 20 L 0 20 Z', neighbors: ['r1', 'r2'], color: null },
];

describe('Four Color Theorem', () => {
  describe('validateFourColor', () => {
    it('should return valid when no conflicts', () => {
      const regions: Region[] = [
        { ...testRegions[0], color: '#ff0000' },
        { ...testRegions[1], color: '#00ff00' },
        { ...testRegions[2], color: '#0000ff' },
      ];
      const result = validateFourColor(regions);
      expect(result.valid).toBe(true);
      expect(result.conflicts).toHaveLength(0);
    });

    it('should detect conflicts', () => {
      const regions: Region[] = [
        { ...testRegions[0], color: '#ff0000' },
        { ...testRegions[1], color: '#ff0000' },
        { ...testRegions[2], color: '#0000ff' },
      ];
      const result = validateFourColor(regions);
      expect(result.valid).toBe(false);
      expect(result.conflicts.length).toBeGreaterThan(0);
    });
  });

  describe('isFullyColored', () => {
    it('should return true when all regions are colored', () => {
      const regions: Region[] = testRegions.map(r => ({ ...r, color: '#ff0000' }));
      expect(isFullyColored(regions)).toBe(true);
    });

    it('should return false when some regions are not colored', () => {
      const regions: Region[] = [
        { ...testRegions[0], color: '#ff0000' },
        { ...testRegions[1], color: null },
        { ...testRegions[2], color: '#0000ff' },
      ];
      expect(isFullyColored(regions)).toBe(false);
    });
  });

  describe('isGameComplete', () => {
    it('should return true when fully colored and no conflicts', () => {
      const regions: Region[] = [
        { ...testRegions[0], color: '#ff0000' },
        { ...testRegions[1], color: '#00ff00' },
        { ...testRegions[2], color: '#0000ff' },
      ];
      expect(isGameComplete(regions)).toBe(true);
    });

    it('should return false when there are conflicts', () => {
      const regions: Region[] = [
        { ...testRegions[0], color: '#ff0000' },
        { ...testRegions[1], color: '#ff0000' },
        { ...testRegions[2], color: '#0000ff' },
      ];
      expect(isGameComplete(regions)).toBe(false);
    });
  });

  describe('calculateProgress', () => {
    it('should calculate correct percentage', () => {
      const regions: Region[] = [
        { ...testRegions[0], color: '#ff0000' },
        { ...testRegions[1], color: null },
        { ...testRegions[2], color: null },
      ];
      expect(calculateProgress(regions)).toBe(33);
    });

    it('should return 100 when all colored', () => {
      const regions: Region[] = testRegions.map(r => ({ ...r, color: '#ff0000' }));
      expect(calculateProgress(regions)).toBe(100);
    });

    it('should return 0 when none colored', () => {
      const regions: Region[] = testRegions.map(r => ({ ...r, color: null }));
      expect(calculateProgress(regions)).toBe(0);
    });
  });
});
