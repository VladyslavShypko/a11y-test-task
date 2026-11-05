import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { App } from './App';

describe('Championship Day', () => {
  it('renders the page heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Championship Day' }),
    ).toBeInTheDocument();
  });

  it('shows every heat on the schedule', () => {
    render(<App />);

    expect(screen.getByText('Heat 1')).toBeInTheDocument();
    expect(screen.getByText('Heat 2')).toBeInTheDocument();
    expect(screen.getByText('Heat 3')).toBeInTheDocument();
  });

  it('shows finished sessions when Finished is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Finished' }));

    expect(screen.getByText('Heat 2')).toBeInTheDocument();
    expect(screen.queryByText('Heat 1')).not.toBeInTheDocument();
  });

  it('supports keyboard activation and announces the selected session filter', async () => {
    const user = userEvent.setup();
    render(<App />);
    const finished = screen.getByRole('button', { name: 'Finished' });
    finished.focus();
    await user.keyboard('{Enter}');
    expect(finished).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('Heat 1')).not.toBeInTheDocument();
  });

  it('shows an athlete when Results is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: 'Results' }));

    expect(screen.getByText('Lena Berg')).toBeInTheDocument();
    expect(
      screen.getByRole('tabpanel', { name: 'Results' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Qualified')).toHaveLength(2);
    expect(screen.getAllByText('Eliminated')).toHaveLength(2);
  });

  it('moves Tab from the selected view into its session filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    const schedule = screen.getByRole('tab', { name: 'Schedule' });
    schedule.focus();
    await user.tab();

    const results = screen.getByRole('tab', { name: 'Results' });
    expect(results).toHaveFocus();
    expect(results).toHaveAttribute('aria-selected', 'false');
    await user.tab();
    const medals = screen.getByRole('tab', { name: 'Medals' });
    expect(medals).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Live only' })).toHaveFocus();
    expect(schedule).toHaveAttribute('aria-selected', 'true');
  });

  it('activates a view with Enter when its button has focus', async () => {
    const user = userEvent.setup();
    render(<App />);
    const results = screen.getByRole('tab', { name: 'Results' });
    results.focus();
    await user.keyboard('{Enter}');
    expect(results).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Lena Berg')).toBeInTheDocument();
  });

  it('sorts the bib column and exposes its current sort direction', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('tab', { name: 'Results' }));
    await user.click(screen.getByRole('button', { name: 'Sort by bib' }));
    expect(screen.getByRole('columnheader', { name: 'Bib' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
  });

  it('shows the medal ceremonies note when Medals is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('tab', { name: 'Medals' }));

    expect(
      screen.getByText('Medal ceremonies are published after the final heat.'),
    ).toBeInTheDocument();
  });

  it('switches the document theme and announces the active state', async () => {
    const user = userEvent.setup();
    render(<App />);
    const darkThemeToggle = screen.getByRole('button', { name: 'Dark theme' });

    expect(document.documentElement).toHaveClass('light');
    expect(darkThemeToggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(darkThemeToggle);
    expect(document.documentElement).toHaveClass('dark');
    expect(darkThemeToggle).toHaveAttribute('aria-pressed', 'true');

    await user.click(darkThemeToggle);
    expect(document.documentElement).toHaveClass('light');
    expect(darkThemeToggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows the heat detail when Details is activated', async () => {
    const user = userEvent.setup();
    render(<App />);

    const [heatOneDetails] = screen.getAllByRole('button', { name: 'Details' });
    if (heatOneDetails === undefined) {
      throw new Error('Expected a Details control');
    }

    await user.click(heatOneDetails);

    expect(screen.getByText('First run starts at 10:15.')).toBeInTheDocument();
  });

  it('opens and closes alert preferences', async () => {
    const user = userEvent.setup();
    render(<App />);
    const opener = screen.getByRole('button', { name: 'Manage alerts' });

    await user.click(opener);
    expect(screen.getByText('Heat changes')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Heat changes')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('shows a confirmation when the share control is used', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByText('Link copied')).toBeInTheDocument();
  });
});
