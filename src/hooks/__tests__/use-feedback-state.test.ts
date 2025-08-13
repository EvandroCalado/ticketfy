import { describe, expect, it, vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Mock React hooks
vi.mock('react', () => ({
  useEffect: vi.fn().mockImplementation(fn => fn()),
}));

describe('use-feedback-state hook', () => {
  it('should export useFeedbackState function', async () => {
    const { useFeedbackState } = await import('../use-feedback-state');
    expect(typeof useFeedbackState).toBe('function');
  });

  it('should call useEffect when imported', async () => {
    const { useFeedbackState } = await import('../use-feedback-state');
    const { useEffect } = await import('react');

    const successState = {
      success: true,
      message: 'Success!',
      fieldErrors: undefined,
      payload: undefined,
    };

    useFeedbackState(successState, {});

    expect(useEffect).toHaveBeenCalled();
  });
});
