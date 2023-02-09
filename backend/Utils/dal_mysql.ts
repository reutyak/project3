require("dotenv").config();
import mysql from "mysql";

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

console.log("we are connected to the DB");

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    //to Promisify an asynchronous function
    //execute the sql on mysql server
    connection.query(sql, (err, result) => {
      //if we got an error, exit with reject and return
      if (err) {
        reject(err);
        return;
      }
      //return the result....
      resolve(result);
    });
  });
};

export default { execute };
