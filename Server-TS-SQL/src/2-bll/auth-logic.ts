import dal from '../1-dal/dal';
import UserModel from '../models/user-model';
import CredentialsModel from '../models/credentials-model';
import ErrorModel from '../models/error-model';
import cyber from '../utils/cyber';
import { v4 as uuid } from 'uuid';

async function register(user: UserModel): Promise<string> {
  const errors = user.validateRegister();
  if (errors) {
    throw new ErrorModel(400, errors);
  }

  // Is email taken:
  const isTaken = await isEmailTaken(user.email);
  if (isTaken) {
    console.log('email is taken');
    throw new ErrorModel(400, `Sorry. Email ${user.email} is not available.`);
  }

  // Hash password:
  user.password = cyber.hash(user.password);

  // new UUID as new ID:
  user.id = uuid();

  const sql = `INSERT INTO users(userId, firstName, lastName, email, password, role)
  VALUES(?, ?, ?, ?, ? , 0)`;
  const parameters = [
    user.id,
    user.firstName,
    user.lastName,
    user.email,
    user.password,
  ];

  await dal.execute(sql, parameters);
  console.log(
    `New User - ${
      user.firstName + ' ' + user.lastName
    } - Registered Successfully.`
  );

  // Remove password:
  delete user.password;

  console.log("auth-logic-REGISTER - USER - " , user);
  
  const token = cyber.getNewToken(user);
  return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
  const errors = credentials.validateLogin();
  if (errors) {
    throw new ErrorModel(400, credentials.validateLogin());
  }

  // Hash password:
  credentials.password = cyber.hash(credentials.password);

  const sql = `SELECT userId AS id, firstName, lastName, email, role
              FROM users 
              WHERE email = ? AND password = ?`;
  const parameters = [credentials.email, credentials.password];

  const users = await dal.execute(sql, parameters);

  // If user not exists:
  if (users.length === 0) {
    throw new ErrorModel(401, 'Incorrect username or password');
  }

  const user = users[0];

  console.log(
    `User - ${user.firstName + ' ' + user.lastName} - Logeed In Successfully.`
  );

  // Remove password:
  delete user.password;

  console.log("auth-logic-LOGIN - USER - " , user);

  const token = cyber.getNewToken(user);
  return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
  const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  const table = await dal.execute(sql, [email]);
  const row = table[0];
  const count = row.count;
  return count > 0;
}

export default {
  register,
  login,
};
