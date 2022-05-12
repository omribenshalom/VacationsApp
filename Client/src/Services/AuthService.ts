import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import { clearVacations } from "../Redux/VacationsState";
import config from "../Utils/Config";
import socketService from "./SocketService";

class AuthService {
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(config.registerUrl, user);
    const token = response.data;

    store.dispatch(registerAction(token));
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(config.loginUrl, credentials);
    const token = response.data;

    store.dispatch(loginAction(token));
  }

  public async logout(): Promise<void> {
    await socketService.disconnect();

    store.dispatch(logoutAction());
    store.dispatch(clearVacations());
  }
}

const authService = new AuthService();

export default authService;
