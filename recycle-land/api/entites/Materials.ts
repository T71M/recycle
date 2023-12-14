import { MATERIALS } from "../constants/materials";

export default class Materials {
  public async readAll() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materials`, {
        method: "GET",
        next: { revalidate: 120 },
      });
      if (!res.ok) {
        return MATERIALS;
      }
      const data = await res.json();
      return data as Material[];
    } catch (error) {
      console.log(error);
      return MATERIALS as Material[];
    }
  }
}
