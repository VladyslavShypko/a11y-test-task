import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { AlertsModal } from './components/AlertsModal';
import { ResultsTable } from './components/ResultsTable';
import { ScheduleList } from './components/ScheduleList';
import { SessionFilters } from './components/SessionFilters';
import { SiteHeader } from './components/SiteHeader';
import { ViewSwitcher } from './components/ViewSwitcher';
import {
  copy,
  filterSessions,
  type SessionFilterId,
  sessions,
  type ViewId,
} from './data/fixtures';

export function App() {
  const [activeView, setActiveView] = useState<ViewId>('schedule');
  const [activeFilter, setActiveFilter] = useState<SessionFilterId>('all');
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const manageAlertsButtonRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreAlertsFocus = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    document.documentElement.classList.toggle('light', !isDarkTheme);
  }, [isDarkTheme]);

  const handleCloseAlerts = useCallback(() => {
    shouldRestoreAlertsFocus.current = true;
    setIsAlertsOpen(false);
  }, []);

  useEffect(() => {
    if (!isAlertsOpen && shouldRestoreAlertsFocus.current) {
      shouldRestoreAlertsFocus.current = false;
      manageAlertsButtonRef.current?.focus();
    }
  }, [isAlertsOpen]);

  const visibleSessions = filterSessions(sessions, activeFilter);

  return (
    <main
      className={css({
        color: 'text.primary',
        maxW: { md: '48rem' },
        mx: 'auto',
        px: { base: '4', md: '8' },
        py: { base: '6', md: '8' },
        w: 'full',
      })}
    >
      <Stack gap="6">
        <SiteHeader
          isDarkTheme={isDarkTheme}
          manageAlertsButtonRef={manageAlertsButtonRef}
          onToggleTheme={() => setIsDarkTheme((current) => !current)}
          onManageAlerts={() => setIsAlertsOpen(true)}
        />
        {isAlertsOpen && <AlertsModal onClose={handleCloseAlerts} />}
        <ViewSwitcher activeView={activeView} onViewChange={setActiveView} />
        {activeView === 'schedule' && (
          <section
            id="schedule-panel"
            role="tabpanel"
            aria-labelledby="schedule-view-tab"
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '4',
            })}
          >
            <SessionFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            <ScheduleList sessions={visibleSessions} />
          </section>
        )}
        {activeView === 'results' && (
          <section
            id="results-panel"
            role="tabpanel"
            aria-labelledby="results-view-tab"
          >
            <ResultsTable />
          </section>
        )}
        {activeView === 'medals' && (
          <section
            id="medals-panel"
            role="tabpanel"
            aria-labelledby="medals-view-tab"
          >
            <p
              className={css({ color: 'text.primary', textStyle: 't_medium' })}
            >
              {copy.medals}
            </p>
          </section>
        )}
      </Stack>
    </main>
  );
}

App.displayName = 'App';
