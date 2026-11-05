import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AlertsModal } from './AlertsModal';

describe('AlertsModal', () => {
  it('renders a named modal dialog and focuses the first preference', () => {
    render(<AlertsModal onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Alert preferences' });

    expect(dialog).toHaveAttribute('aria-modal', 'true');

    expect(
      screen.getByRole('checkbox', { name: 'Heat changes' }),
    ).toHaveFocus();
    expect(
      screen.getByRole('checkbox', { name: 'Medal ceremonies' }),
    ).toBeInTheDocument();
  });

  it('does not close on unrelated keys, and closes on Escape or Close', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<AlertsModal onClose={onClose} />);

    await user.tab();
    expect(
      screen.getByRole('checkbox', { name: 'Medal ceremonies' }),
    ).toHaveFocus();
    expect(onClose).not.toHaveBeenCalled();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
