import { CITIES } from "../constants/citities";

export default class Cities {
  async readAll() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`, {
        next: { revalidate: 120 },
      });
      if (!res.ok) {
        return { cities: CITIES };
      }

      const data = (await res.json()) as { cities: City[] };

      return data;
    } catch (error) {
      console.log(error);
      return { cities: CITIES };
    }
  }
}
