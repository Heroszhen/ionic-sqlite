import { capSQLiteSet } from '@capacitor-community/sqlite';
export const createSchema: string = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY NOT NULL,
  email TEXT,
  name TEXT,
  age INTEGER
);
PRAGMA user_version = 1;
`;        

// Insert some Users
const row: Array<Array<any>> = [["Whiteley","Whiteley.com",30.2],["Jones","Jones.com",44]];
export const twoUsers: string = `
DELETE FROM users;
INSERT INTO users (name,email,age) VALUES ("${row[0][0]}","${row[0][1]}",${row[0][2]});
INSERT INTO users (name,email,age) VALUES ("${row[1][0]}","${row[1][1]}",${row[1][2]});
`;
export const twoUsers2: string = `
INSERT INTO users (name,email,age) VALUES ("${row[0][0]}","${row[0][1]}",${row[0][2]});
INSERT INTO users (name,email,age) VALUES ("${row[1][0]}","${row[1][1]}",${row[1][2]});
`;
// Insert some Tests issue#56
export const twoTests = `
DELETE FROM test56;
INSERT INTO test56 (name) VALUES ("test 1");
INSERT INTO test56 (name) VALUES ("test 2");
`;
export const setUsers: Array<capSQLiteSet>  = [
  { statement:"INSERT INTO users (name,email,age) VALUES (?,?,?);",
    values:["Jackson","Jackson@example.com",18]
  },
  { statement:"INSERT INTO users (name,email,age) VALUES (?,?,?);",
    values:["Kennedy","Kennedy@example.com",25]
  },
  { statement:"INSERT INTO users (name,email,age) VALUES (?,?,?);",
    values:["Bush","Bush@example.com",42]
  },
];

