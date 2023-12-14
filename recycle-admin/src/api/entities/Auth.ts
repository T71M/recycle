import Base from "../configs/Base";

export default class Auth extends Base {
  public async login(data: LoginRequest) {
    const url = this.queryBuilder("/auth/login");
    const res = await this.request.post(url, data);

    return res.data;
  }

  public async whoami() {
    const url = this.queryBuilder("/auth/whoami");
    const res = await this.request.get(url);

    return res.data;
  }

  public async register(data: RegisterRequest) {
    const url = this.queryBuilder("/auth/register");
    const res = await this.request.post(url, data);

    return res.data;
  }
}
