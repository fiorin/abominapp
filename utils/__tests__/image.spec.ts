import { describe, it, expect } from 'vitest';
import { getAbominationImage, getAbominationIcon } from '@/utils/image';

describe('Image utilities', () => {
  describe('getAbominationImage', () => {
    it('should generate correct path for abomination image', () => {
      expect(getAbominationImage('zombie')).toBe('/images/abominations/zombie.png');
      expect(getAbominationImage('runner-elite')).toBe('/images/abominations/runner-elite.png');
    });

    it('should handle slugs with special characters', () => {
      expect(getAbominationImage('zombie_a')).toBe('/images/abominations/zombie_a.png');
      expect(getAbominationImage('zombie-1')).toBe('/images/abominations/zombie-1.png');
    });
  });

  describe('getAbominationIcon', () => {
    it('should generate correct path for abomination icon', () => {
      expect(getAbominationIcon('zombie')).toBe('/images/icons/zombie.png');
      expect(getAbominationIcon('runner-elite')).toBe('/images/icons/runner-elite.png');
    });

    it('should use icons folder instead of abominations folder', () => {
      const imagePath = getAbominationImage('zombie');
      const iconPath = getAbominationIcon('zombie');
      
      expect(imagePath).toContain('/images/abominations/');
      expect(iconPath).toContain('/images/icons/');
    });
  });
});
