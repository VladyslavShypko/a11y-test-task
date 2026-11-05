import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SessionFilters } from './SessionFilters';

describe('SessionFilters', () => {
  it('announces the active filter and reports changes from the options', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <SessionFilters activeFilter="all" onFilterChange={onFilterChange} />,
    );

    expect(
      screen.getByRole('button', { name: 'All sessions' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Live only' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );

    await user.click(screen.getByRole('button', { name: 'Live only' }));
    await user.click(screen.getByRole('button', { name: 'Finished' }));
    expect(onFilterChange).toHaveBeenNthCalledWith(1, 'live');
    expect(onFilterChange).toHaveBeenNthCalledWith(2, 'finished');
  });

  it('supports Space-key activation', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <SessionFilters activeFilter="all" onFilterChange={onFilterChange} />,
    );
    const liveOnly = screen.getByRole('button', { name: 'Live only' });
    liveOnly.focus();

    await user.keyboard(' ');

    expect(onFilterChange).toHaveBeenCalledWith('live');
  });
});
