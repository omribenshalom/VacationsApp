const vacationsDao = require('../dao/vacations-dao');

// ----------------------------------------
// Getall Vacations
async function getAll() {
  console.log('all. logic.');
  const vacations = await vacationsDao.getAll();
  return vacations;
}

// // ----------------------------------------
// // Get-one Vacation
async function getVacation(vacationId) {
  const vacation = await vacationsDao.getVacation(vacationId);
  return vacation;
}

// // ----------------------------------------
// // Add Vacation
async function addVacation(newVacation) {
  validateVacationDetails(newVacation);
  const vacation = await vacationsDao.addVacation(newVacation);
  return vacation;
}

// // ----------------------------------------
// // Update Vacation
async function updateVacation(vacationUpdate) {
  validateVacationDetails(vacationUpdate);
  const updatedVacation = await vacationsDao.updateVacation(vacationUpdate);
  return updatedVacation;
}

// // ----------------------------------------
// // Delete Vacation
async function deleteVacation(vacationId) {
  await vacationsDao.deleteVacation(vacationId);
}

// ----------------------------------------
// Validations
function validateVacationDetails(vacationDetails) {
  if (vacationDetails.destination == null) {
    throw new Error(`please enter destination.`);
  }
  if (vacationDetails.description == null) {
    throw new Error(`please enter description.`);
  }
  if (vacationDetails.startDate == null) {
    throw new Error(`please enter start date.`);
  }
  if (vacationDetails.endDate == null) {
    throw new Error(`please enter end date.`);
  }
  if (vacationDetails.image == null) {
    throw new Error(`please enter link to image online.`);
  }
  if (vacationDetails.price == null) {
    throw new Error(`please enter price $$$.`);
  }
}

module.exports = {
  getAll,
  getVacation,
  addVacation,
  updateVacation,
  deleteVacation,
  validateVacationDetails,
};
