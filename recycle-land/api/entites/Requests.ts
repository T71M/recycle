export default class Requests {
  async create(values: PartnerRequest) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      throw await res.json();
    }
    const data = await res.json();

    return data;
  }
}
