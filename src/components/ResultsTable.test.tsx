import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ResultsTable } from './ResultsTable';

const athleteOrder = () =>
  within(screen.getByRole('table', { name: 'Heat results' }))
    .getAllByRole('row')
    .slice(1)
    .map(
      (row) =>
        within(row).getByRole('cell', {
          name: /Lena Berg|Maya Chen|Sofia Rossi|Hana Novak/,
        }).textContent,
    );

describe('ResultsTable', () => {
  it('renders a caption and meaningful column headings', () => {
    render(<ResultsTable />);

    const table = screen.getByRole('table', { name: 'Heat results' });

    expect(
      within(table).getByRole('columnheader', { name: 'Athlete' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: 'Status' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('button', { name: 'Sort by rank' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('button', { name: 'Sort by bib' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: 'Rank' }),
    ).not.toHaveAttribute('aria-sort');
    expect(
      within(table).getByRole('columnheader', { name: 'Bib' }),
    ).not.toHaveAttribute('aria-sort');
  });

  it('starts unsorted and sorts rank ascending, then descending', async () => {
    render(<ResultsTable />);

    const user = userEvent.setup();
    const rankHeader = screen.getByRole('columnheader', { name: 'Rank' });

    expect(rankHeader).not.toHaveAttribute('aria-sort');
    expect(athleteOrder()).toEqual([
      'Lena Berg',
      'Maya Chen',
      'Sofia Rossi',
      'Hana Novak',
    ]);

    await user.click(screen.getByRole('button', { name: 'Sort by rank' }));
    expect(rankHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(athleteOrder()).toEqual([
      'Lena Berg',
      'Maya Chen',
      'Sofia Rossi',
      'Hana Novak',
    ]);

    await user.click(screen.getByRole('button', { name: 'Sort by rank' }));
    expect(rankHeader).toHaveAttribute('aria-sort', 'descending');
    expect(athleteOrder()).toEqual([
      'Hana Novak',
      'Sofia Rossi',
      'Maya Chen',
      'Lena Berg',
    ]);

    await user.click(screen.getByRole('button', { name: 'Sort by rank' }));
    expect(rankHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(athleteOrder()).toEqual([
      'Lena Berg',
      'Maya Chen',
      'Sofia Rossi',
      'Hana Novak',
    ]);
  });

  it('sorts bib ascending when changing columns and toggles direction on repeat', async () => {
    render(<ResultsTable />);

    const user = userEvent.setup();
    const bibHeader = screen.getByRole('columnheader', { name: 'Bib' });
    const rankHeader = screen.getByRole('columnheader', { name: 'Rank' });

    await user.click(screen.getByRole('button', { name: 'Sort by rank' }));
    await user.click(screen.getByRole('button', { name: 'Sort by bib' }));

    expect(bibHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(rankHeader).not.toHaveAttribute('aria-sort');
    expect(athleteOrder()).toEqual([
      'Sofia Rossi',
      'Lena Berg',
      'Maya Chen',
      'Hana Novak',
    ]);

    await user.click(screen.getByRole('button', { name: 'Sort by bib' }));
    expect(bibHeader).toHaveAttribute('aria-sort', 'descending');
    expect(athleteOrder()).toEqual([
      'Hana Novak',
      'Maya Chen',
      'Lena Berg',
      'Sofia Rossi',
    ]);
  });

  it('supports sorting with Enter and Space from the keyboard', async () => {
    render(<ResultsTable />);

    const user = userEvent.setup();
    const rankButton = screen.getByRole('button', { name: 'Sort by rank' });
    const bibButton = screen.getByRole('button', { name: 'Sort by bib' });
    await user.tab();
    expect(rankButton).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('columnheader', { name: 'Rank' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );

    await user.tab();
    expect(bibButton).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('columnheader', { name: 'Bib' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
  });
});
