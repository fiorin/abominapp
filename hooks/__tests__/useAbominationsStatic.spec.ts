import { describe, it, expect } from 'vitest';
import { useAbominationsStatic } from '@/hooks/useAbominationsStatic';
import { Abomination, Group } from '@/types';

// Mock the JSON import
const mockData: Abomination[] = [
  {
    name: 'Zombie',
    slug: 'zombie',
    actions: 1,
    damage: 1,
    description: 'Basic zombie',
    danger: 1,
    ability: 'Walker',
    group: 'default' as Group,
    enabled: true,
  },
  {
    name: 'Runner',
    slug: 'runner',
    actions: 2,
    damage: 1,
    description: 'Fast zombie',
    danger: 2,
    ability: 'Runner',
    group: 'expansion' as Group,
    enabled: false,
  },
  {
    name: 'Abomination',
    slug: 'abomination',
    actions: 3,
    damage: 3,
    description: 'Very dangerous',
    danger: 4,
    ability: 'Boss',
    group: 'exclusive' as Group,
    enabled: true,
  },
];

describe('useAbominationsStatic', () => {
  it('should return abominations object with data', () => {
    const result = useAbominationsStatic();
    
    expect(result).toHaveProperty('abominations');
    expect(Array.isArray(result.abominations)).toBe(true);
  });

  it('should filter by enabled status when requested', () => {
    const enabledResult = useAbominationsStatic(true);
    const allResult = useAbominationsStatic(false);
    
    expect(enabledResult.abominations.length).toBeLessThanOrEqual(
      allResult.abominations.length
    );
  });

  it('should sort abominations properly', () => {
    const result = useAbominationsStatic(false);
    
    if (result.abominations.length >= 2) {
      const groups = result.abominations.map((a: Abomination) => a.group);
      // Verify default comes before or at same position as expansion
      const defaultIndex = groups.indexOf('default');
      const expansionIndex = groups.indexOf('expansion');
      
      if (defaultIndex !== -1 && expansionIndex !== -1) {
        expect(defaultIndex).toBeLessThanOrEqual(expansionIndex);
      }
    }
  });
});

