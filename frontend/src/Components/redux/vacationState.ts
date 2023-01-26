import Vacation from "../../Models/Vacation";

export class VacationState {
  public vacationsSt: Vacation[] = [];
}

export enum vacationActionType {
  getAllVacationSt = "getAllVacationSt",
  deleteVacationSt = "deleteVacationSt",
  addVacationSt = "addVacationSt",
  updateVacationSt = "updateVacationSt",
  logOut = "logOut",
  addFollow = "addFollow",
  reduceFollow = "reduceFollow",
}

export interface VacationAction {
  type: vacationActionType;
  payload?: any;
}

export function logOut(): VacationAction {
  return { type: vacationActionType.logOut };
}

//function to handle the state changes (dispatch)
export function getAllVacationSt(vacations: Vacation[]): VacationAction {
  return { type: vacationActionType.getAllVacationSt, payload: vacations };
}

//delete vacation
export function deleteVacationSt(id: number): VacationAction {
  return { type: vacationActionType.deleteVacationSt, payload: id };
}

//add vacation
export function addVacationSt(vacation: Vacation): VacationAction {
  return { type: vacationActionType.addVacationSt, payload: vacation };
}

//update vacation
export function updateVacationSt(newVacation: Vacation): VacationAction {
  return { type: vacationActionType.updateVacationSt, payload: newVacation };
}

export function vacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  // const newState = {...currentState};
  const newState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case vacationActionType.logOut:
      newState.vacationsSt = [];
      break;
    case vacationActionType.getAllVacationSt:
      console.log(action);
      newState.vacationsSt = action.payload;
      console.log(newState);
      break;

    case vacationActionType.addVacationSt:
      console.log(newState);
      console.log(action.payload);
      newState.vacationsSt.push(action.payload);
      console.log(newState);
      console.log(newState.vacationsSt);
      break;

    case vacationActionType.updateVacationSt:
      newState.vacationsSt = newState.vacationsSt
        .filter((item: { id: any }) => item.id !== action.payload)
        .push(action.payload);
      break;

    case vacationActionType.deleteVacationSt:
      console.log(newState);
      console.log(action.payload);
      newState.vacationsSt = newState.vacationsSt.filter(
        (item: { id: any }) => item.id !== action.payload
      );
      console.log(newState);

      break;
  }

  return newState;
}
