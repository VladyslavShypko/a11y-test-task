import { css, cx } from 'styled-system/css';

import sortNeutralIcon from '../assets/sort-neutral.svg?no-inline';

type SortDirection = 'asc' | 'desc' | null;

const sortIconClass = css({
  color: 'text.secondary',
  h: '5',
  w: '5',
});

const activeSortIconClass = css({ color: 'text.primary' });

interface SortIndicatorProps {
  direction: SortDirection;
}

export function SortIndicator({ direction }: SortIndicatorProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={sortIconClass}>
      <use
        href={`${sortNeutralIcon}#sort-up`}
        className={cx(direction === 'asc' && activeSortIconClass)}
        fill={direction === 'asc' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
        x="0"
        y="0"
        width="24"
        height="12"
      />
      <use
        href={`${sortNeutralIcon}#sort-down`}
        className={cx(direction === 'desc' && activeSortIconClass)}
        fill={direction === 'desc' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
        x="0"
        y="12"
        width="24"
        height="12"
      />
    </svg>
  );
}

SortIndicator.displayName = 'SortIndicator';
