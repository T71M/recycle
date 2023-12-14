import { AxiosInstance } from "axios";
import queryBuilder from "../../utils/queryBuilder";
export default class Base {
  protected request: AxiosInstance;
  protected queryBuilder = queryBuilder;
  constructor(request: AxiosInstance) {
    this.request = request;
  }
}
