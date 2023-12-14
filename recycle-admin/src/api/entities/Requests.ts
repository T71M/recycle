import Base from "../configs/Base";
export default class Requests extends Base {
  async readAll(params: PartnerRequestFindParams) {
    const url = this.queryBuilder("/requests").addPaginationParams(params);

    const res = await this.request.get<MetaResponse<PartnerRequest>>(url);

    return res.data;
  }

  async delete(id: PartnerRequest["id"]) {
    const url = this.queryBuilder(`/requests/${id}/status`);

    const res = await this.request.post<PartnerRequest>(url, { status: false });

    return res.data;
  }

  async fullDelete(id: PartnerRequest["id"]) {
    const url = this.queryBuilder(`/requests/${id}`);

    const res = await this.request.delete<PartnerRequest>(url);

    return res.data;
  }

  async recover(id: PartnerRequest["id"]) {
    const url = this.queryBuilder(`/requests/${id}/status`);

    const res = await this.request.post<PartnerRequest>(url, { status: true });

    return res.data;
  }

  async readOne(id?: PartnerRequest["id"]) {
    if (!id) return null;
    const url = this.queryBuilder(`/requests/${id}`);

    const res = await this.request.get<{ request: PartnerRequest }>(url);

    return res.data.request;
  }

  async accept(id: PartnerRequest["id"]) {
    const url = this.queryBuilder(`/requests/${id}/accept`);

    const res = await this.request.post<PartnerRequest>(url);

    return res.data;
  }
}
