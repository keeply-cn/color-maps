import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { GameState } from '@/types';

interface ColorMapsDB extends DBSchema {
  games: {
    key: string;
    value: {
      id: string;
      mapId: string;
      gameState: GameState;
      createdAt: number;
      updatedAt: number;
    };
  };
  settings: {
    key: string;
    value: {
      key: string;
      value: unknown;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<ColorMapsDB>> | null = null;

export function initDB(): Promise<IDBPDatabase<ColorMapsDB>> {
  if (!dbPromise) {
    dbPromise = openDB<ColorMapsDB>('color-maps-db', 1, {
      upgrade(db) {
        // 游戏存档表
        db.createObjectStore('games', { keyPath: 'id' });
        // 设置表
        db.createObjectStore('settings', { keyPath: 'key' });
      },
    });
  }
  return dbPromise;
}

export async function saveGame(mapId: string, gameState: GameState): Promise<void> {
  const db = await initDB();
  const existingGame = await db.get('games', mapId);
  
  await db.put('games', {
    id: mapId,
    mapId,
    gameState,
    createdAt: existingGame?.createdAt || Date.now(),
    updatedAt: Date.now(),
  });
}

export async function loadGame(mapId: string): Promise<GameState | null> {
  const db = await initDB();
  const game = await db.get('games', mapId);
  return game?.gameState || null;
}

export async function deleteGame(mapId: string): Promise<void> {
  const db = await initDB();
  await db.delete('games', mapId);
}

export async function saveSetting<T>(key: string, value: T): Promise<void> {
  const db = await initDB();
  await db.put('settings', { key, value });
}

export async function loadSetting<T>(key: string): Promise<T | null> {
  const db = await initDB();
  const setting = await db.get('settings', key);
  return setting?.value as T || null;
}
