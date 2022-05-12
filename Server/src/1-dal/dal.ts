import mysql from 'mysql';
import config from '../utils/config';

const connection = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

function execute(sql: string, values?: any[]): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql,  values, (err, result) => {
      if (err) {
        console.log('Failed interacting with DB.');
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export default {
  execute
};
