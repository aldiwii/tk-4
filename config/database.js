import * as SQLite from 'expo-sqlite';

// init db if not exist
export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('datacollector.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS people (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        address TEXT,
        phone_number TEXT,
        email TEXT,
        city_of_origin TEXT,
        date_of_birth TEXT,
        religion TEXT
      );
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// func for adding new data
export const addPerson = async (person) => {
  try {
    const db = await SQLite.openDatabaseAsync('datacollector.db');
    
    const result = await db.runAsync(
      `INSERT INTO people (full_name, address, phone_number, email, city_of_origin, date_of_birth, religion) 
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        person.full_name,
        person.address || null,
        person.phone_number || null,
        person.email || null,
        person.city_of_origin || null,
        person.date_of_birth || null,
        person.religion || null
      ]
    );
    
    return result;
  } catch (error) {
    console.error('Error adding person:', error);
    throw error;
  }
};

// get all for homepage
export const getAllPeople = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('datacollector.db');
    const allRows = await db.getAllAsync('SELECT * FROM people;');
    return allRows;
  } catch (error) {
    console.error('Error getting all people:', error);
    throw error;
  }
};

// getter for detail
export const getPersonById = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync('datacollector.db');
    const person = await db.getFirstAsync('SELECT * FROM people WHERE id = ?;', [id]);
    return person;
  } catch (error) {
    console.error('Error getting person by ID:', error);
    throw error;
  }
};

// edit func
export const updatePerson = async (id, person) => {
  try {
    const db = await SQLite.openDatabaseAsync('datacollector.db');
    
    const result = await db.runAsync(
      `UPDATE people 
       SET full_name = ?, address = ?, phone_number = ?, email = ?, 
           city_of_origin = ?, date_of_birth = ?, religion = ?
       WHERE id = ?;`,
      [
        person.full_name,
        person.address || null,
        person.phone_number || null,
        person.email || null,
        person.city_of_origin || null,
        person.date_of_birth || null,
        person.religion || null,
        id
      ]
    );
    
    return result;
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};

// delete func
export const deletePerson = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync('datacollector.db');
    const result = await db.runAsync('DELETE FROM people WHERE id = ?;', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};