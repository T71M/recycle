import axios from "axios";
import tokenStorage from "../token/tokenStorage";
import Auth from "./entities/Auth";
import Partners from "./entities/Partners";
import Requests from "./entities/Requests";
import Materials from "./entities/Materials";

export default class AppService {
  public auth = new Auth(this.request);
  public partners = new Partners(this.request);
  public requests = new Requests(this.request);
  public materials = new Materials(this.request);

  private get request() {
    const instance = axios.create();

    instance.interceptors.request.use((config) => {
      const token = tokenStorage.getToken();
      if (token) {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }
}
