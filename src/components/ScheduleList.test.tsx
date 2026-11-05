import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { sessions } from '../data/fixtures';
import { ScheduleList } from './ScheduleList';

describe('ScheduleList', () => {
  it('expands and collapses session details independently', async () => {
    render(<ScheduleList sessions={sessions} />);

    const user = userEvent.setup();
    const detailsButtons = screen.getAllByRole('button', { name: 'Details' });
    const heatOneDetails = detailsButtons[0];
    const heatTwoDetails = detailsButtons[1];
    if (!heatOneDetails || !heatTwoDetails) {
      throw new Error('Expected Details buttons for the first two sessions');
    }

    expect(heatOneDetails).toHaveAttribute('aria-expanded', 'false');
    expect(heatTwoDetails).toHaveAttribute('aria-expanded', 'false');

    await user.click(heatOneDetails);
    expect(heatOneDetails).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First run starts at 10:15.')).toBeInTheDocument();
    expect(heatTwoDetails).toHaveAttribute('aria-expanded', 'false');

    await user.click(heatOneDetails);
    expect(heatOneDetails).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByText('First run starts at 10:15.'),
    ).not.toBeInTheDocument();
  });
});
