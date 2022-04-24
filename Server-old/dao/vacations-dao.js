const Vacation = require('../models/vacation');

// ----------------------------------------
// Getall Vacations
async function getAll() {
  console.log('all. dal.');
  try {
    const vacations = await Vacation.find();
    console.log('vacations - ', vacations);
    return vacations;
  } catch (error) {
    console.log(error.message);
  }
}

// // ----------------------------------------
// // Get-one Vacation
async function getVacation(vacationId) {
  console.log('one. dal.');
  try {
    const vacation = await Vacation.findById(vacationId);
    console.log('vacation - ', vacation);
    return vacation;
  } catch (error) {
    console.log(error.message);
  }
}

// // ----------------------------------------
// // Add Vacation
async function addVacation(newVacation) {
  console.log('add. dal.');
  try {
    const vacation = new Vacation(newVacation);
    vacation.save();
    console.log('New vacation added succesfully! : ', newVacation);
    return vacation;
  } catch (error) {
    console.log(error.message);
  }
}

// // ----------------------------------------
// // Update Vacation
async function updateVacation(vacation) {
  console.log('update. dal.');
  try {
    Vacation.findOneAndUpdate(
      { _id: vacation._id },
      {
        destination: vacation.destination,
        description: vacation.description,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        price: vacation.price,
        image: vacation.image,
      },
      { new: true },
      (error, vacation) => {
        if (error) {
          console.log(error);
        } else {
          console.log('vacation updated succesfully! : ', vacation);
          return vacation;
        }
      }
    );
    return vacation;
  } catch (error) {
    console.log(error.message);
  }
}

// // ----------------------------------------
// // Delete Vacation
async function deleteVacation(id) {
  console.log('delete. dal.');
  try {
    await Vacation.deleteOne({ _id: id });
    console.log('vacation deleted successfully. db.');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getAll,
  getVacation,
  addVacation,
  updateVacation,
  deleteVacation,
};
