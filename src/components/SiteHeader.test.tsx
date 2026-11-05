import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes the event banner content as alternative text', () => {
    render(
      <SiteHeader
        isDarkTheme={false}
        onToggleTheme={vi.fn()}
        onManageAlerts={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('img', { name: /Alpine skiing.*58 gates.*180 m/ }),
    ).toBeInTheDocument();
  });

  it('toggles favorite state and announces the share confirmation', async () => {
    const user = userEvent.setup();

    render(
      <SiteHeader
        isDarkTheme={false}
        onToggleTheme={vi.fn()}
        onManageAlerts={vi.fn()}
      />,
    );

    const addFavorite = screen.getByRole('button', {
      name: 'Add to favorites',
    });

    expect(addFavorite).toHaveAttribute('aria-pressed', 'false');
    await user.click(addFavorite);
    expect(
      screen.getByRole('button', { name: 'Remove from favorites' }),
    ).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('status')).toHaveTextContent('Link copied');
  });

  it('calls the alert preferences action', async () => {
    const user = userEvent.setup();
    const onManageAlerts = vi.fn();

    render(
      <SiteHeader
        isDarkTheme={false}
        onToggleTheme={vi.fn()}
        onManageAlerts={onManageAlerts}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Manage alerts' }));

    expect(onManageAlerts).toHaveBeenCalledOnce();
  });

  it('exposes the theme toggle state and calls its handler', async () => {
    const user = userEvent.setup();
    const onToggleTheme = vi.fn();

    render(
      <SiteHeader
        isDarkTheme={false}
        onToggleTheme={onToggleTheme}
        onManageAlerts={vi.fn()}
      />,
    );

    const themeToggle = screen.getByRole('button', { name: 'Dark theme' });
    expect(themeToggle).toHaveAttribute('aria-pressed', 'false');
    expect(themeToggle.querySelector('img')).toHaveAttribute(
      'aria-hidden',
      'true',
    );

    await user.click(themeToggle);
    expect(onToggleTheme).toHaveBeenCalledOnce();
  });
});
