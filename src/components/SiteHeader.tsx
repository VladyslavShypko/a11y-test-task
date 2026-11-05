import { type Ref, useState } from 'react';
import { css } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import alpineSkiing from '../assets/alpine-skiing.svg';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';
import { copy } from '../data/fixtures';

const focusRing = {
  _focusVisible: {
    outlineColor: 'focus.default',
    outlineOffset: '0.125rem',
    outlineStyle: 'solid',
    outlineWidth: '0.125rem',
  },
} as const;

const iconButtonClass = css({
  alignItems: 'center',
  bg: 'surface.base',
  borderColor: 'border.primary',
  borderRadius: 'full',
  borderStyle: 'solid',
  borderWidth: 'xs',
  color: 'graphics.primary_text',
  cursor: 'pointer',
  display: 'inline-flex',
  h: '10',
  justifyContent: 'center',
  w: '10',
  _hover: { bg: 'surface.subtle' },
  ...focusRing,
});

const manageAlertsClass = css({
  bg: 'surface.brand',
  borderColor: 'border.brand',
  borderRadius: 'md',
  borderStyle: 'solid',
  borderWidth: 'xs',
  color: 'text.on_brand',
  cursor: 'pointer',
  h: '10',
  px: '4',
  textStyle: 't_small_b',
  _hover: { bg: 'action.brand_hover' },
  ...focusRing,
});

export interface SiteHeaderProps {
  isDarkTheme: boolean;
  manageAlertsButtonRef?: Ref<HTMLButtonElement>;
  onToggleTheme: () => void;
  onManageAlerts: () => void;
}

export function SiteHeader({
  isDarkTheme,
  manageAlertsButtonRef,
  onToggleTheme,
  onManageAlerts,
}: SiteHeaderProps) {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  return (
    <header>
      <Stack gap="3">
        <Flex align="flex-start" justify="space-between" w="full" gap="2">
          <img
            src={alpineSkiing}
            alt="Alpine skiing. Course: 58 gates, 180 m vertical drop."
            className={css({
              borderRadius: 'lg',
              flex: '1',
              h: 'auto',
              maxW: '20rem',
              minW: '0px',
              w: 'full',
            })}
          />
          <button
            type="button"
            aria-label="Dark theme"
            aria-pressed={isDarkTheme}
            className={iconButtonClass}
            onClick={onToggleTheme}
          >
            <img
              src={isDarkTheme ? moonIcon : sunIcon}
              alt=""
              aria-hidden="true"
              className={css({ h: '5', w: '5' })}
            />
          </button>
        </Flex>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
          gap="4"
        >
          <Stack gap="3">
            <h1
              className={css({ color: 'text.primary', textStyle: 'h_large' })}
            >
              {copy.heading}
            </h1>
            <p
              className={css({ color: 'text.primary', textStyle: 't_medium' })}
            >
              {copy.event}
            </p>
            <p
              className={css({ color: 'text.secondary', textStyle: 't_small' })}
            >
              {copy.date}
            </p>
          </Stack>
          <Stack gap="2" alignItems={{ base: 'flex-start', md: 'flex-end' }}>
            <Flex gap="2" wrap="wrap">
              <button
                type="button"
                aria-label={
                  isStarFilled ? 'Remove from favorites' : 'Add to favorites'
                }
                aria-pressed={isStarFilled}
                className={iconButtonClass}
                onClick={() => setIsStarFilled((current) => !current)}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={css({ h: '5', w: '5' })}
                >
                  <path
                    d="M12 2.6l2.7 5.7 6.2.8-4.6 4.3 1.2 6.2L12 16.8 6.5 19.6l1.2-6.2L3.1 9.1l6.2-.8L12 2.6z"
                    fill={isStarFilled ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Menu"
                className={iconButtonClass}
                onClick={() => setHasCopiedLink(true)}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={css({ h: '5', w: '5' })}
                >
                  <circle
                    cx="6"
                    cy="12"
                    r="2.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="17"
                    cy="6"
                    r="2.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="17"
                    cy="18"
                    r="2.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 11.1l7-3.6M8 12.9l7 3.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </button>
              <button
                type="button"
                ref={manageAlertsButtonRef}
                className={manageAlertsClass}
                onClick={onManageAlerts}
              >
                {copy.manageAlerts}
              </button>
            </Flex>
            {hasCopiedLink && (
              <p
                role="status"
                className={css({ color: 'text.primary', textStyle: 't_small' })}
              >
                {copy.linkCopied}
              </p>
            )}
          </Stack>
        </Flex>
      </Stack>
    </header>
  );
}

SiteHeader.displayName = 'SiteHeader';
