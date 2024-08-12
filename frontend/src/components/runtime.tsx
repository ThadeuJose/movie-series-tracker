import { Duration } from 'luxon';
import { IconWatch } from '../icon-watch';

interface RuntimeProps {
  className?: string;
  runtime: number;
}

export function Runtime({ className, runtime }: RuntimeProps) {
  if (runtime > 0) {
    return (
      <div className={`flex flex-row items-center ${className}`}>
        <div className="mr-1 flex items-baseline">
          <IconWatch />
        </div>
        <div className="font-semibold" data-cy="runtime">
          {formatNumberToMinutesSeconds(runtime)}
        </div>
      </div>
    );
  }
}

function formatNumberToMinutesSeconds(minutes: number): string {
  const duration = Duration.fromObject({ hours: 0, minutes }).normalize();

  // Get the number of hours and minutes
  const hours = duration.hours;
  const mins = duration.minutes;

  //Format the output
  let formatted = '';
  if (hours) {
    formatted += `${hours}h`;
  }
  if (mins) {
    formatted += `${mins}m`;
  }

  return formatted;
}
