import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({id, content});
  const result = await request;
  console.log("added item to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("got all items from the database", result);
  return result;
};

initdb();
