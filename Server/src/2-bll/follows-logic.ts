import { OkPacket } from 'mysql';
import dal from '../1-dal/dal';

async function addFollow(userId: string, vacationId: number): Promise<number> {
  console.log('follow . LOGIC.');

  let sql = `INSERT INTO follows_table (userId, vacationId) 
    VALUES (?,?);`;
  let parameters = [userId, vacationId];

  const info: OkPacket = await dal.execute(sql, parameters);
  const id = info.insertId;
  return id;
}

async function unFollow(userId: string, vacationId: number): Promise<void> {
  console.log('Un - Follow . LOGIC.');

  let sql = `DELETE FROM follows_table WHERE userId=? AND vacationId=?; `;
  let parameters = [userId, vacationId];

  await dal.execute(sql, parameters);
  return;
}


export default {
  addFollow,
  unFollow,
};
