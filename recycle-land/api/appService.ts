import Cities from "./entites/City";
import Geo from "./entites/Geo";
import Materials from "./entites/Materials";
import Requests from "./entites/Requests";

class AppService {
  public geo = new Geo();
  public materials = new Materials();
  public cities = new Cities();
  public requests = new Requests();
}

const api = new AppService();

export default api;
