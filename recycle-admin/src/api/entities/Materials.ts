import Base from "../configs/Base";

export default class Materials extends Base {
  public async readAll() {
    const url = this.queryBuilder("/materials");

    const res = await this.request.get<Material[]>(url);

    return res.data;
  }
}
