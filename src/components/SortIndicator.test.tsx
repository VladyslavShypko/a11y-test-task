import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SortIndicator } from './SortIndicator';

const getUses = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('svg use'));

const getGeometry = (container: HTMLElement) =>
  getUses(container).map((icon) => ({
    height: icon.getAttribute('height'),
    href: icon.getAttribute('href'),
    strokeWidth: icon.getAttribute('stroke-width'),
    width: icon.getAttribute('width'),
    x: icon.getAttribute('x'),
    y: icon.getAttribute('y'),
  }));

describe('SortIndicator', () => {
  it('shows stacked, outlined arrows when no direction is active', () => {
    const { container } = render(<SortIndicator direction={null} />);

    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(getUses(container)).toHaveLength(2);
    expect(getUses(container).map((icon) => icon.getAttribute('fill'))).toEqual(
      ['none', 'none'],
    );
    expect(getGeometry(container)).toEqual([
      {
        height: '12',
        href: expect.stringContaining('#sort-up'),
        strokeWidth: '1.4',
        width: '24',
        x: '0',
        y: '0',
      },
      {
        height: '12',
        href: expect.stringContaining('#sort-down'),
        strokeWidth: '1.4',
        width: '24',
        x: '0',
        y: '12',
      },
    ]);
  });

  it('changes only the fill for the active sort direction', () => {
    const { container, rerender } = render(<SortIndicator direction={null} />);
    const initialGeometry = getGeometry(container);

    rerender(<SortIndicator direction="asc" />);
    expect(getGeometry(container)).toEqual(initialGeometry);
    expect(getUses(container).map((icon) => icon.getAttribute('fill'))).toEqual(
      ['currentColor', 'none'],
    );

    rerender(<SortIndicator direction="desc" />);
    expect(getGeometry(container)).toEqual(initialGeometry);
    expect(getUses(container).map((icon) => icon.getAttribute('fill'))).toEqual(
      ['none', 'currentColor'],
    );
  });
});
