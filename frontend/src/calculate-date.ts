import { DateTime } from 'luxon';

export function calculateReleaseDateDiff(release: string, today: Date): string {
  const later = DateTime.fromISO(release);
  const now = DateTime.fromJSDate(today);
  const durationUntilRelease = later.diff(now, ['months', 'days']);

  const totalMonths = Math.floor(durationUntilRelease.as('months'));
  const totalDays = Math.round(durationUntilRelease.as('days')) % 30; // Approximate remaining days

  // Build the result string conditionally
  let result = '';

  if (totalMonths > 0) {
    result += `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
  }

  if (totalDays > 0) {
    if (result.length > 0) {
      result += ' and ';
    }
    result += `${totalDays} day${totalDays > 1 ? 's' : ''}`;
  }

  return result || 'Released'; // Return 'Released' if no months or days are present
}
