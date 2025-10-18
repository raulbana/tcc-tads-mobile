export type LeakageLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';

export interface UrinationDataDTO {
  time: string;
  amount: string;
  leakage: boolean;
  reason?: string;
  urgency?: boolean;
}

export interface CalendarDayDTO {
  date: string;
  leakageLevel: string;
  eventsCount: number;
  completedExercises: number;
  notesPreview?: string;
  urinationData: UrinationDataDTO[];
  dayTitle: string;
  dayNumber: number;
  isToday: boolean;
  today?: boolean;
}

export interface CalendarRequestDTO {
  date: string;
  leakageLevel: string;
  notesPreview?: string;
  urinationData?: UrinationDataDTO[];
}

export type CalendarRangeResponse = Record<string, CalendarDayDTO>;