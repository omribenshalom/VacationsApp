import axios from 'axios';
import VacationModel from '../Models/VacationModel';
import store from '../Redux/Store';
import config from '../Utils/Config';
import SocketService from './SocketService';

import {
  getVacationsAction,
  addVacationsAction,
  updateVacationAction,
  deleteVacationAction,
  followVacationAction,
  unFollowVacationAction,
} from '../Redux/VacationsState';

class VacationsService {

  public async getVacations(getAnyway: boolean): Promise<VacationModel[]> {
    let vacations = store.getState().vacationsState.vacations;
    if (vacations.length === 0 || getAnyway === true) {
      const response = await axios.get<VacationModel[]>(config.vacationsUrl);
      vacations = response.data;
      console.log('VacationsService.getVacations - ', vacations);
      store.dispatch(getVacationsAction(vacations));
    }
    return vacations;
  }

  public async getOneVacation(id: number): Promise<VacationModel> {
    
    let vacations = await this.getVacations(false);
    const vacation = vacations.find((vac) => vac.id === id);

    console.log('VacationsService.getOneVacation - ', vacation);
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    let formData: FormData = new FormData();
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', vacation.startDate);
    formData.append('endDate', vacation.endDate);
    formData.append('price', vacation.price.toString());
    formData.append('image', vacation.image.item(0));

    const response = await axios.post<VacationModel>(
      config.vacationsUrl,
      formData
    );

    const addedVacation = response.data;

    store.dispatch(addVacationsAction(addedVacation));

    SocketService.vacationsChange();

    console.log('VacationsService.addVacation - ', addedVacation);
    return addedVacation;
  }

  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    let formData: FormData = new FormData();
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', vacation.startDate);
    formData.append('endDate', vacation.endDate);
    formData.append('price', vacation.price.toString());
    formData.append('image', vacation.image.item(0));

    const response = await axios.put<VacationModel>(
      config.vacationsUrl + vacation.id,
      formData
    );

    const updatedVacation = response.data;

    store.dispatch(updateVacationAction(updatedVacation));

    SocketService.vacationsChange();

    console.log('VacationsService.updateVacation - ', updatedVacation);
    return updatedVacation;
  }

  public async deleteVacation(id: number): Promise<void> {
    await axios.delete(config.vacationsUrl + id);
    store.dispatch(deleteVacationAction(id));

    console.log('service. delete good.');

    SocketService.vacationsChange();

    return;
  }

  public async followVacation(vacationId: number): Promise<void> {
    await axios.post(config.followsUrl + vacationId);

    store.dispatch(followVacationAction(vacationId));
  }

  public async unFollowVacation(vacationId: number): Promise<void> {
    await axios.delete(config.followsUrl + vacationId);

    store.dispatch(unFollowVacationAction(vacationId));
  }
}

const vacationService = new VacationsService();

export default vacationService;
