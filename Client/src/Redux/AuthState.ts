import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// State
export class AuthState {
  public user: UserModel = null;
  public token: string = null;

  public constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      const encodedObject: any = jwtDecode(this.token);
      this.user = encodedObject.user;
    }
  }
}

// Action Type
export enum AuthActionType {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

// Action
export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

// Action Creators:
export function registerAction(token: string): AuthAction {
  return { type: AuthActionType.REGISTER, payload: token };
}
export function loginAction(token: string): AuthAction {
  return { type: AuthActionType.LOGIN, payload: token };
}
export function logoutAction(): AuthAction {
  return { type: AuthActionType.LOGOUT };
}

// Reducer:
export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.REGISTER:
    case AuthActionType.LOGIN:
      newState.token = action.payload;
      const encodedObject: any = jwtDecode(newState.token);
      newState.user = encodedObject.user;
      localStorage.setItem("token", newState.token);
      break;
    case AuthActionType.LOGOUT:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("token");
      break;
  }
  return newState;
}
