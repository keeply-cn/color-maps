import { describe, it, expect } from 'vitest';
import { isSameColor, canColorRegion, hasColorConflict, formatTime } from '@/lib/utils';

describe('Utils', () => {
  describe('isSameColor', () => {
    it('should return true for same colors', () => {
      expect(isSameColor('#ff0000', '#ff0000')).toBe(true);
    });

    it('should return false for different colors', () => {
      expect(isSameColor('#ff0000', '#00ff00')).toBe(false);
    });

    it('should handle null colors', () => {
      expect(isSameColor(null, null)).toBe(true);
      expect(isSameColor(null, '#ff0000')).toBe(false);
    });
  });

  describe('canColorRegion', () => {
    it('should allow coloring when no neighbors have same color', () => {
      const region = { neighbors: ['1', '2'], color: null };
      const allRegions = new Map([
        ['1', { color: '#ff0000' }],
        ['2', { color: '#00ff00' }],
      ]);
      expect(canColorRegion(region, allRegions, '#0000ff')).toBe(true);
    });

    it('should disallow coloring when neighbor has same color', () => {
      const region = { neighbors: ['1', '2'], color: null };
      const allRegions = new Map([
        ['1', { color: '#ff0000' }],
        ['2', { color: '#00ff00' }],
      ]);
      expect(canColorRegion(region, allRegions, '#ff0000')).toBe(false);
    });
  });

  describe('hasColorConflict', () => {
    it('should return false when no conflicts', () => {
      const regions = [
        { id: '1', color: '#ff0000', neighbors: ['2'] },
        { id: '2', color: '#00ff00', neighbors: ['1'] },
      ];
      expect(hasColorConflict(regions)).toBe(false);
    });

    it('should return true when conflict exists', () => {
      const regions = [
        { id: '1', color: '#ff0000', neighbors: ['2'] },
        { id: '2', color: '#ff0000', neighbors: ['1'] },
      ];
      expect(hasColorConflict(regions)).toBe(true);
    });
  });

  describe('formatTime', () => {
    it('should format seconds correctly', () => {
      expect(formatTime(5000)).toBe('00:05');
    });

    it('should format minutes and seconds correctly', () => {
      expect(formatTime(65000)).toBe('01:05');
    });
  });
});
