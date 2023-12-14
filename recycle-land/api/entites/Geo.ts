import { LatLng } from "leaflet";
import queryString from "query-string";

export default class Geo {
  public async getGeoByCoordinates(coordinates: LatLng) {
    try {
      const qs = queryString.stringify(
        { ...coordinates },
        { skipEmptyString: true, skipNull: true }
      );
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cities/is-in-allowed-city?${qs}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        return {
          city: "Город не поддерживается сервисом",
        } as GeocodingResponse;
      }

      const json = await res.json();

      return json as GeocodingResponse;
    } catch (error) {
      return {
        city: "Город не поддерживается сервисом",
      } as GeocodingResponse;
    }
  }

  public async getPartners(
    coordinates?: CoordinatesRequest,
    materials?: string[]
  ) {
    try {
      if (!coordinates) return null;
      const qs = queryString.stringify(
        { ...coordinates, materials },
        { skipEmptyString: true, skipNull: true }
      );
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/partners/coordinates?${qs}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        return {
          partners: [],
        };
      }

      const json = await res.json();

      return json as { partners: Partner[] };
    } catch (error) {
      return {
        partners: [],
      };
    }
  }
}
