// Create variable to hold the database connection
let db;

// Establish a connection to IndexedDB database called "budget_tracker"
// and set it to version 1
const request = indexedDB.open("budget", 1);

// This event will emit if the database version changes
request.onupgradeneeded = function (event) {
  // Save a reference to the database

  const db = event.target.result;
  // Create an object store called 'budget'
  // Set it to have an auto-incrementing primary key
  db.createObjectStore("new_budget", { autoIncrement: true });
};

// Upon a successful connection
request.onsuccess = function (event) {
  // When database is successfully created with its object store
  db = event.target.result;

  // Check if the application is online - if yes, then run the below function
  // This will send all local database data to API
  if (navigator.onLine) {
    uploadBudget();
  }
};

request.onerror = function (event) {
  // Log the error here
  console.log("Error:" + event.target.errorCode);
};

/// This function will be executed if an attempt is made to submit and there's no internet connection
function saveRecord(record) {
  // Open a new transaction with the database with read and write permissions
  const transaction = db.transaction(["new_budget"], "readwrite");

  // Access the object store for "new_budget"
  const budgetObjectStore = transaction.objectStore("new_budget");

  // Add record to store with the add method
  budgetObjectStore.add(record);
}

function uploadBudget() {
  // Open a new transaction on the database
  const transaction = db.transaction(["new_budget"], "readwrite");

  // Access object store
  const store = transaction.objectStore("new_budget");

  // Get all records from store and assign it to a variable
  const getEverything = store.getAll();

  getEverything.onsuccess = function () {
    if (getEverything.result.length > 0) {
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(getEverything.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          // Delete records if this doesn't work!

          // Set up the transaction variable
          const transaction = db.transaction(["new_budget"], "readwrite");

          // Set up the store variable
          const store = transaction.objectStore("new_budget");

          // Clear the store
          store.clear();
        });
    }
  };
}
function deleteInProgress() {
  // Set up transaction variable
  const transaction = db.transaction(["new_budget"], "readwrite");

  // Set up the store variable
  const store = transaction.objectStore("new_budget");
  store.clear();
}

window.addEventListener("online", uploadBudget);
