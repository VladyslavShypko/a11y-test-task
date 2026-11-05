import { describe, expect, it } from 'vitest';

import { filterSessions, sessions } from './fixtures';

describe('filterSessions', () => {
  it('returns only live sessions for the live filter', () => {
    expect(
      filterSessions(sessions, 'live').map((session) => session.name),
    ).toEqual(['Heat 1']);
  });

  it('returns all sessions without mutating the source for the all filter', () => {
    const all = filterSessions(sessions, 'all');

    expect(all).toEqual(sessions);
    expect(all).not.toBe(sessions);
  });

  it('returns only completed sessions for the finished filter', () => {
    expect(
      filterSessions(sessions, 'finished').map((session) => session.name),
    ).toEqual(['Heat 2']);
  });
});
