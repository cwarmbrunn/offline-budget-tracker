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

  // Upon a successful connection
  request.onsuccess = function (event) {
    // When database is successfully created with its object store
    db = event.target.result;

    // Check if the application is online - if yes, then run the below function
    // This will send all local database data to API

    // TODO: This hasn't been created yet - but it will be soon, commenting out for now
    // uploadBudget();
  };
};

request.onerror = function (event) {
  // Log the error here
  console.log(event.target.errorCode);
};

/// This function will be executed if an attempt is made to submit and there's no internet connection
function saveRecord(record) {
  // Open a new transaction with the database with read and write permissions
  const transaction = db.transaction(["new_budget"], "readwrite");

  // Access the object store for "new_budget"
  const 
}
