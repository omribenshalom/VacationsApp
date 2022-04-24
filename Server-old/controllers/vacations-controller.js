const express = require('express');
const vacationsLogic = require('../logic/vacations-logic');

const router = express.Router();

// ----------------------------------------
// Getall Vacations
router.get('/', async (req, res, next) => {
  try {
    console.log('all. controller.');
    const vacations = await vacationsLogic.getAll();
    res.send(vacations);
  } catch (err) {
    console.error('err : ', err);
    return next(err);
  }
});

// // ----------------------------------------
// // Get-one Vacation
router.get('/:id', async (req, res, next) => {
  // console.log("get one . controller");
  const vacationId = req.params.id;
  try {
    const vacation = await vacationsLogic.getVacation(vacationId);
    res.json(vacation);
  } catch (err) {
    console.error('err : ', err);
    return next(err);
  }
});

// // ----------------------------------------
// // Add Vacation
router.post('/', async (req, res, next) => {
  // console.log("add vacation controller");
  const newVacation = req.body;
  try {
    const vacation = await vacationsLogic.addVacation(newVacation);
    res.json(vacation);
  } catch (err) {
    console.error('err : ', err);
    return next(err);
  }
});

// // ----------------------------------------
// // Update Vacation
router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const vacationData = req.body;
  vacationData._id = id;
  console.log("vacation Data - ", vacationData)
  try {
    const updatedVacation = await vacationsLogic.updateVacation(vacationData);
    res.json(updatedVacation);
  } catch (err) {
    console.error('err : ', err);
    return next(err);
  }
});

// // ----------------------------------------
// // Delete Vacation
router.delete('/:id', async (req, res, next) => {
  const vacationId = req.params.id;
  try {
    await vacationsLogic.deleteVacation(vacationId);
    res.status(204).send();
  } catch (err) {
    console.error('err : ', err);
    return next(err);
  }
});

module.exports = router;
