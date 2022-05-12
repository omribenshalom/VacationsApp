import dal from '../1-dal/dal';
import ErrorModel from '../models/error-model';
import VacationModel from '../models/vacation-model';
import { v4 as uuid } from 'uuid';
import { OkPacket } from 'mysql';
import path from 'path';
import fs from 'fs';

async function getAllVacations(userId: string): Promise<VacationModel[]> {
  const sql = `
      SELECT v.vacationId AS id, v.destination, v.description, v.imageName, v.price,
      v.startDate AS startDate, 
      v.endDate AS endDate,
      follows_table.userId AS isUserFollow,  

      (SELECT COUNT(*) FROM follows_table          
      WHERE vacationId = v.vacationId) AS numOfFollowers  

      FROM vacations v 

      LEFT JOIN follows_table 
      ON v.vacationId = follows_table.vacationId && follows_table.userId = ?
  
      ORDER BY follows_table.userId DESC
      `;

  let parameters = [userId];

  const vacations = await dal.execute(sql, parameters);
  return vacations;
}

async function getOneVacation(id): Promise<VacationModel> {
  const sql = ` SELECT 
                  vacationId as id, 
                  destination, 
                  description, 
                  startDate, 
                  endDate,
                  price, 
                  imageName
                  FROM vacations v
                  WHERE v.vacationId = ${id}`;
  const result = await dal.execute(sql);
  const vacation = result[0];
  return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  const error = vacation.validatePost();
  if (error) {
    console.log('error logic - ', error);
    let message = error;
    throw new ErrorModel(400, message);
  }

  // only if image was sent.
  if (vacation.image) {
    const extension = vacation.image.name.substring(
      vacation.image.name.lastIndexOf('.')
    );
    vacation.imageName = uuid() + extension;
    const absolutePath = path.join(
      __dirname,
      '..',
      'assets',
      'images',
      vacation.imageName
    );

    await vacation.image.mv(absolutePath);

    delete vacation.image;
  }

  let sql = ` INSERT INTO vacations 
                  (destination, 
                  description, 
                  startDate, 
                  endDate,
                  price,
                  imageName)
                  VALUES(?,?,?,?,?,?)`;
  let parameters = [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName,
  ];

  const info: OkPacket = await dal.execute(sql, parameters);
  vacation.id = info.insertId;

  return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  const error = vacation.validatePut();
  if (error) {
    throw new ErrorModel(400, error);
  }

  // only if image was sent.
  if (vacation.image) {
    removeImageFromDisk(vacation.imageName);

    const extension = vacation.image.name.substring(
      vacation.image.name.lastIndexOf('.')
    );
    vacation.imageName = uuid() + extension;
    const absolutePath = path.join(
      __dirname,
      '..',
      'assets',
      'images',
      vacation.imageName
    );
    await vacation.image.mv(absolutePath);
    delete vacation.image;
  }
  // If there in no image. We shall keep the old one.

  let sql = ` UPDATE vacations 
                  SET
                  destination = ?,
                  description = ?,
                  startDate = ?,
                  endDate = ?,
                  price = ?,
                  imageName = ?
                  WHERE vacationId = ?`;
  let parameters = [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName,
    vacation.id,
  ];
  await dal.execute(sql, parameters);

  return vacation;
}

async function deleteVacation(id: number): Promise<void> {
  const vacation = await getOneVacation(id);
  if (vacation.imageName) {
    removeImageFromDisk(vacation.imageName);
  }

  const sql = ` DELETE 
                FROM vacations 
                WHERE vacationId = ${id}`;
  await dal.execute(sql);
  return;
}

async function removeImageFromDisk(imageName: string) {
  const absolutePath = path.join(
    __dirname,
    '..',
    'assets',
    'images',
    imageName
  );
  await fs.unlink(absolutePath, function (err) {
    if (err) throw err;
  });
  return;
}

export default {
  getAllVacations,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation,
};
