import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ViewSwitcher } from './ViewSwitcher';

describe('ViewSwitcher', () => {
  it('labels the tablist and exposes the selected tab and panel relationship', () => {
    render(<ViewSwitcher activeView="schedule" onViewChange={vi.fn()} />);

    expect(screen.getByRole('tablist', { name: 'Views' })).toBeInTheDocument();
    const scheduleTab = screen.getByRole('tab', { name: 'Schedule' });
    expect(scheduleTab).toHaveAttribute('aria-selected', 'true');
    expect(scheduleTab).toHaveAttribute('aria-controls', 'schedule-panel');
    expect(screen.getByRole('tab', { name: 'Results' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('calls the view-change callback when another tab is activated', async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    render(<ViewSwitcher activeView="schedule" onViewChange={onViewChange} />);

    await user.click(screen.getByRole('tab', { name: 'Medals' }));

    expect(onViewChange).toHaveBeenCalledWith('medals');
  });
});
