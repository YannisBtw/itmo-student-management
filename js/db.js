const DB_NAME = "studentManagementDB";
const DB_VERSION = 2;
const STORE_NAME = "students";


function openDatabase() {
    return new Promise(function (resolve, reject) {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id", autoIncrement: true
                });
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;

            resolve(db);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


async function addStudent(student) {
    const db = await openDatabase();

    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(STORE_NAME, "readwrite");

        const store = transaction.objectStore(STORE_NAME);

        const request = store.add(student);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


async function getAllStudents() {
    try {
        const db = await openDatabase();

        return new Promise(function (resolve, reject) {
            const transaction = db.transaction(STORE_NAME, "readonly");

            const store = transaction.objectStore(STORE_NAME);

            const request = store.getAll();

            request.onsuccess = function (event) {
                resolve(event.target.result);
            };

            request.onerror = function (event) {
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error("Ошибка чтения студентов:", error);

        return [];
    }
}


async function getStudent(id) {
    const db = await openDatabase();

    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(STORE_NAME, "readonly");

        const store = transaction.objectStore(STORE_NAME);

        const request = store.get(id);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


async function updateStudent(student) {
    const db = await openDatabase();

    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(STORE_NAME, "readwrite");

        const store = transaction.objectStore(STORE_NAME);

        const request = store.put(student);

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


async function deleteStudent(id) {
    const db = await openDatabase();

    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(STORE_NAME, "readwrite");

        const store = transaction.objectStore(STORE_NAME);

        const request = store.delete(id);

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}