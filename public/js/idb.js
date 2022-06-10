// Create variable to hold the database connection
let db;

// Establish a connection to IndexedDB database called "budget_tracker"
// and set it to version 1
const request = indexedDB.open("budget_tracker", 1);

// This event will emit if the database version changes
request.onupgradeneeded = function (event) {
  // Save a reference to the database

  const db = event.target.result;
  // Create an object store called 'budget'
  // Set it to have an auto-incrementing primary key
  db.createObjectStore("budget", { autoIncrement: true });
};
