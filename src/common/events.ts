export const Events = {
  SLOW_QUERY_DETECTED: 'slow-query.detected',
} as const;

export type EventName = (typeof Events)[keyof typeof Events];

export interface SlowQueryDetectedEvent {
  query: string;
  parameters?: unknown[];
  executionTime: number;
  createdAt: Date;
}
