import { setFormData } from "../../utils/setFormData";
import Base from "../configs/Base";

export default class Partners extends Base {
  public async fetchAllPartners(params: PartnerFindParams) {
    const url = this.queryBuilder("/partners").addPaginationParams(params);
    const res = await this.request.get<MetaResponse<Partner>>(url);

    return res.data;
  }

  public async fetchPartner(id?: number) {
    if (!id) return null;
    const url = this.queryBuilder(`/partners/${id}`).addCustomParams({
      admin: true,
    });
    const res = await this.request.get<{ partner: Partner }>(url);

    return res.data.partner;
  }

  public async createPartner(data: Partner) {
    const url = this.queryBuilder("/partners");
    const fd = setFormData(data);
    const res = await this.request.post<Partner>(url, fd);

    return res.data;
  }

  public async updatePartner({ id, ...rest }: Partner) {
    const url = this.queryBuilder(`/partners/${id}`);
    const fd = setFormData(rest);
    if (rest.image === "") {
      fd.append("image", "");
    }
    const res = await this.request.patch<Partner>(url, fd);

    return res.data;
  }

  async delete(id: Partner["id"]) {
    const url = this.queryBuilder(`/partners/${id}/status`);

    const res = await this.request.post<PartnerRequest>(url, { status: false });

    return res.data;
  }

  async recover(id: Partner["id"]) {
    const url = this.queryBuilder(`/partners/${id}/status`);

    const res = await this.request.post<PartnerRequest>(url, { status: true });

    return res.data;
  }
}
