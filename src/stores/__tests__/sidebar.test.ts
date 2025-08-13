import { describe, expect, it } from 'vitest';

import { useSidebarStore } from '../sidebar';

describe('useSidebarStore', () => {
  it('should initialize with closed sidebar', () => {
    const { isOpen } = useSidebarStore.getState();
    expect(isOpen).toBe(false);
  });

  it('should toggle sidebar state', () => {
    const { toggle } = useSidebarStore.getState();

    // Initially closed
    expect(useSidebarStore.getState().isOpen).toBe(false);

    // Toggle to open
    toggle();
    expect(useSidebarStore.getState().isOpen).toBe(true);

    // Toggle back to closed
    toggle();
    expect(useSidebarStore.getState().isOpen).toBe(false);
  });

  it('should handle multiple toggles correctly', () => {
    const { toggle } = useSidebarStore.getState();

    // Start from known state
    useSidebarStore.setState({ isOpen: false });

    // Multiple toggles
    toggle(); // true
    toggle(); // false
    toggle(); // true
    toggle(); // false

    expect(useSidebarStore.getState().isOpen).toBe(false);
  });
});
