import Dexie from "dexie";

export const db = new Dexie('BoardDatabase')

db.version(1).stores({
    sections: '++id, title'
});