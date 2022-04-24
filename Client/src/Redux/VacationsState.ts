import VacationModel from '../Models/VacationModel';

export class VacationsState {
  public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
  GET_VACATIONS = 'GET_VACATIONS',
  ADD_VACATION = 'ADD_VACATION',
  UPDATE_VACATION = 'UPDATE_VACATION',
  DELETE_VACATION = 'DELETE_VACATION',
  FOLLOW = 'FOLLOW',
  UN_FOLLOW = 'UN_FOLLOW',
}

export interface VacationsAction {
  type: VacationsActionType;
  payload: any;
}

export const getVacationsAction = (
  vacations: VacationModel[]
): VacationsAction => {
  return {
    type: VacationsActionType.GET_VACATIONS,
    payload: vacations,
  };
};
export const addVacationsAction = (
  vacation: VacationModel
): VacationsAction => {
  return {
    type: VacationsActionType.ADD_VACATION,
    payload: vacation,
  };
};
export const updateVacationAction = (
  vacation: VacationModel
): VacationsAction => {
  return {
    type: VacationsActionType.UPDATE_VACATION,
    payload: vacation,
  };
};
export const deleteVacationAction = (id: number): VacationsAction => {
  return {
    type: VacationsActionType.DELETE_VACATION,
    payload: id,
  };
};
export const followVacationAction = (id: number): VacationsAction => {
  return {
    type: VacationsActionType.FOLLOW,
    payload: id,
  };
};
export const unFollowVacationAction = (id: number): VacationsAction => {
  return {
    type: VacationsActionType.UN_FOLLOW,
    payload: id,
  };
};

export const vacationsReducer = (
  currentState = new VacationsState(),
  action: VacationsAction
): VacationsState => {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.GET_VACATIONS:
      newState.vacations = action.payload;
      break;

    case VacationsActionType.ADD_VACATION:
      newState.vacations.push(action.payload);
      break;

    case VacationsActionType.UPDATE_VACATION:
      const indexToUpdate = newState.vacations.findIndex(
        (vacation) => vacation.id === action.payload.id
      );
      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = action.payload;
      }
      break;

    case VacationsActionType.DELETE_VACATION:
      const indexToDelete = newState.vacations.findIndex(
        (vacation) => vacation.id === action.payload
      );
      if (indexToDelete >= 0) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;
    case VacationsActionType.FOLLOW:
      const indexToFollow = newState.vacations.findIndex(
        (vacation) => vacation.id === action.payload
      );
      if (indexToFollow >= 0) {
        newState.vacations[indexToFollow].isUserFollow = true;
      }
      break;
    case VacationsActionType.UN_FOLLOW:
      const indexToUnFollow = newState.vacations.findIndex(
        (vacation) => vacation.id === action.payload
      );
      if (indexToUnFollow >= 0) {
        newState.vacations[indexToUnFollow].isUserFollow = null;
      }
      break;
  }
  return newState;
};
