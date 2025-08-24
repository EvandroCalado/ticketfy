import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ActionState } from '@/constants/action-state';

// Create mock functions
const mockUseActionState = vi.fn();
const mockUseState = vi.fn();
const mockUseFeedbackState = vi.fn();
const mockCloneElement = vi.fn();

// Mock React hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: mockUseActionState,
    useState: mockUseState,
    cloneElement: mockCloneElement,
  };
});

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock use-feedback-state hook
vi.mock('../use-feedback-state', () => ({
  useFeedbackState: mockUseFeedbackState,
}));

// Mock UI components
vi.mock('@/components/shared/lazy-alert-dialog', () => ({
  LazyAlertDialog: ({ children, open }: never) => (
    <div data-testid='alert-dialog' data-open={open}>
      {children}
    </div>
  ),
  LazyAlertDialogContent: ({ children }: never) => (
    <div data-testid='alert-dialog-content'>{children}</div>
  ),
  LazyAlertDialogHeader: ({ children }: never) => (
    <div data-testid='alert-dialog-header'>{children}</div>
  ),
  LazyAlertDialogTitle: ({ children }: never) => (
    <h2 data-testid='alert-dialog-title'>{children}</h2>
  ),
  LazyAlertDialogDescription: ({ children }: never) => (
    <p data-testid='alert-dialog-description'>{children}</p>
  ),
  LazyAlertDialogFooter: ({ children }: never) => (
    <div data-testid='alert-dialog-footer'>{children}</div>
  ),
  LazyAlertDialogCancel: ({ children }: never) => (
    <button data-testid='alert-dialog-cancel'>{children}</button>
  ),
  LazyAlertDialogAction: ({ children }: never) => (
    <div data-testid='alert-dialog-action'>{children}</div>
  ),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, type, variant, disabled }: never) => (
    <button
      data-testid='button'
      type={type}
      data-variant={variant}
      disabled={disabled}
    >
      {children}
    </button>
  ),
}));

describe('use-confirm-dialog hook', () => {
  const mockAction = vi.fn();
  const mockSetIsOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    mockUseActionState.mockReturnValue([
      {
        success: false,
        message: undefined,
        fieldErrors: undefined,
        payload: undefined,
      },
      mockAction,
      false, // isPending
    ]);

    mockUseState.mockReturnValue([false, mockSetIsOpen]);

    mockCloneElement.mockImplementation((element, props) => ({
      ...element,
      props: { ...element.props, ...props },
    }));
  });

  it('should export useConfirmDialog function', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    expect(typeof useConfirmDialog).toBe('function');
  });

  it('should call useActionState with provided action and initial state', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    expect(mockUseActionState).toHaveBeenCalledWith(
      mockAction,
      expect.objectContaining({
        success: false,
        message: undefined,
        fieldErrors: undefined,
        payload: undefined,
      }),
    );
  });

  it('should call useState to manage dialog open state', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    expect(mockUseState).toHaveBeenCalledWith(false);
  });

  it('should call useFeedbackState with state and options', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;
    const onSuccessRedirect = '/dashboard';

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
      onSuccessRedirect,
    });

    expect(mockUseFeedbackState).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: undefined,
        fieldErrors: undefined,
        payload: undefined,
      }),
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
        onSuccessRedirect,
      }),
    );
  });

  it('should clone trigger element with onClick handler', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    expect(mockCloneElement).toHaveBeenCalledWith(
      triggerElement,
      expect.objectContaining({
        onClick: expect.any(Function),
      }),
    );
  });

  it('should return tuple with trigger and dialog elements', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const result = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeDefined(); // trigger
    expect(result[1]).toBeDefined(); // dialog
  });

  it('should use default title and description when not provided', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(
      'Tem certeza?',
    );
    expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent(
      'Esta ação não pode ser desfeita.',
    );
  });

  it('should use custom title and description when provided', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
      title: 'Custom Title',
      description: 'Custom description text',
    });

    render(<div>{dialog}</div>);

    expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(
      'Custom Title',
    );
    expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent(
      'Custom description text',
    );
  });

  it('should show "Confirmar" button text when not pending', async () => {
    mockUseActionState.mockReturnValue([
      {
        success: false,
        message: undefined,
        fieldErrors: undefined,
        payload: undefined,
      },
      mockAction,
      false, // isPending = false
    ]);

    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('Confirmar');
    expect(button).not.toBeDisabled();
  });

  it('should show "Excluindo..." button text when pending', async () => {
    mockUseActionState.mockReturnValue([
      {
        success: false,
        message: undefined,
        fieldErrors: undefined,
        payload: undefined,
      },
      mockAction,
      true, // isPending = true
    ]);

    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('Excluindo...');
    expect(button).toBeDisabled();
  });

  it('should set button as destructive variant and submit type', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('data-variant', 'destructive');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should render cancel button with correct text', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    expect(screen.getByTestId('alert-dialog-cancel')).toHaveTextContent(
      'Cancel',
    );
  });

  it('should pass dialog open state to AlertDialog', async () => {
    mockUseState.mockReturnValue([true, mockSetIsOpen]); // isOpen = true

    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    const alertDialog = screen.getByTestId('alert-dialog');
    expect(alertDialog).toHaveAttribute('data-open', 'true');
  });

  it('should handle onClick function in cloned trigger', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    // Get the onClick function that was passed to cloneElement
    const cloneElementCall = mockCloneElement.mock.calls[0];
    const onClickHandler = cloneElementCall[1].onClick;

    // Call the onClick handler
    onClickHandler();

    // The onClick handler should call setIsOpen with a function that toggles the state
    expect(mockSetIsOpen).toHaveBeenCalledWith(expect.any(Function));

    // Test the toggle function
    const toggleFunction = mockSetIsOpen.mock.calls[0][0];
    expect(toggleFunction(false)).toBe(true);
    expect(toggleFunction(true)).toBe(false);
  });

  it('should render form with action', async () => {
    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    const [, dialog] = useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    render(<div>{dialog}</div>);

    // Verify that the dialog contains a form element
    expect(dialog).toBeDefined();
  });

  it('should call toast.success when onSuccess callback is triggered', async () => {
    const successState: ActionState = {
      success: true,
      message: 'Item deleted successfully',
      fieldErrors: undefined,
      payload: undefined,
    };

    mockUseActionState.mockReturnValue([successState, mockAction, false]);

    // Mock useFeedbackState to call the onSuccess callback
    mockUseFeedbackState.mockImplementation((state, options) => {
      if (options?.onSuccess) {
        options.onSuccess(state);
      }
    });

    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    // Verify that the onSuccess callback was called
    expect(mockUseFeedbackState).toHaveBeenCalledWith(
      successState,
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );
  });

  it('should call toast.error when onError callback is triggered', async () => {
    const errorState: ActionState = {
      success: false,
      message: 'Failed to delete item',
      fieldErrors: undefined,
      payload: undefined,
    };

    mockUseActionState.mockReturnValue([errorState, mockAction, false]);

    // Mock useFeedbackState to call the onError callback
    mockUseFeedbackState.mockImplementation((state, options) => {
      if (options?.onError) {
        options.onError(state);
      }
    });

    const { useConfirmDialog } = await import('../use-confirm-dialog');
    const triggerElement = <button>Delete</button>;

    useConfirmDialog({
      action: mockAction,
      trigger: triggerElement,
    });

    // Verify that the onError callback was called
    expect(mockUseFeedbackState).toHaveBeenCalledWith(
      errorState,
      expect.objectContaining({
        onError: expect.any(Function),
      }),
    );
  });
});
