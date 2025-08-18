import moment, {Moment} from 'moment';

export type MonthCell = {
  date: Moment;
  inCurrentMonth: boolean;
  isToday: boolean;
};

export function getMonthInterval(base: Moment) {
  const start = base.clone().startOf('month').startOf('week');
  const end = base.clone().endOf('month').endOf('week');
  return {start, end};
}

export function buildMonthMatrix(baseDate: Date | Moment): MonthCell[][] {
  const base = moment(baseDate);
  const {start, end} = getMonthInterval(base);
  const totalDays = end.diff(start, 'days') + 1;
  const days: MonthCell[] = Array.from({length: totalDays}, (_, i) => {
    const d = start.clone().add(i, 'days');
    return {
      date: d,
      inCurrentMonth: d.month() === base.month(),
      isToday: d.isSame(moment(), 'day'),
    };
  });

  const weeks: MonthCell[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  while (weeks.length < 6) {
    const last = weeks[weeks.length - 1];
    const nextStart = last[last.length - 1].date.clone().add(1, 'day');
    const filler: MonthCell[] = Array.from({length: 7}, (_, i) => {
      const d = nextStart.clone().add(i, 'day');
      return {
        date: d,
        inCurrentMonth: d.month() === base.month(),
        isToday: d.isSame(moment(), 'day'),
      };
    });
    weeks.push(filler);
  }
  return weeks;
}

export function getMonthIsoRange(baseDate: Date | Moment): {from: string; to: string} {
  const base = moment(baseDate);
  const {start, end} = getMonthInterval(base);
  return {from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD')};
}

export const formatToFirstLetterUppercase = (text: string) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};
