interface City {
  id: number;
  name: string;
  north_lat: number;
  north_long: number;
  east_lat: number;
  east_long: number;
  center_lat: number;
  center_long: number;
}

interface GeocodingResponse {
  allowedCity?: City;
  city?: string;
}

interface CoordinatesRequest {
  northLat: number;
  northLong: number;
  southLat: number;
  southLong: number;
}

interface MapBounds {
  _northEast: { lat: number; lng: number };
  _southWest: { lat: number; lng: number };
}
