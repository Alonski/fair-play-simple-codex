import Dexie, { type Table } from 'dexie';

export interface SessionRecord {
  id?: number;
  createdAt: Date;
  score: number;
  level: number;
  notes?: string;
}

class FairPlayDatabase extends Dexie {
  declare sessions: Table<SessionRecord, number>;

  constructor() {
    super('fair-play');
    this.version(1).stores({
      sessions: '++id, createdAt, score, level',
    });
  }
}

export const db = new FairPlayDatabase();

export async function logSession(record: Omit<SessionRecord, 'id' | 'createdAt'>) {
  return db.sessions.add({
    ...record,
    createdAt: new Date(),
  });
}

export async function loadRecentSessions(limit = 10) {
  return db.sessions.orderBy('createdAt').reverse().limit(limit).toArray();
}
