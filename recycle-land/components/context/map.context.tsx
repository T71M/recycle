import { Map } from "leaflet";
import { FC, createContext, useContext } from "react";

interface MapContextType {
  mapRef: Map | null;
  setMap?: React.Dispatch<React.SetStateAction<Map | null>>;
  partners: Partner[];
  filters: Material[];
  cities: City[];
  selectedCity: string;
  setSelectedCity: (s: string) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (s: string[]) => void;
  isCityFromGeo: boolean;
  setIsCityFromGeo: React.Dispatch<React.SetStateAction<boolean>>;
  setCoordinates: React.Dispatch<
    React.SetStateAction<CoordinatesRequest | undefined>
  >;
}

export const MapContext = createContext<MapContextType>({
  mapRef: null,
  partners: [],
  filters: [],
  cities: [],
  selectedCity: "",
  setSelectedCity: () => {},
  selectedMaterials: [],
  setSelectedMaterials: () => {},
  isCityFromGeo: false,
  setIsCityFromGeo: () => {},
  setCoordinates: () => {},
});
export const useMapContext = () => useContext(MapContext);

export const MapContextProvider: FC<
  MapContextType & { children: React.ReactNode }
> = ({ children, ..._props }) => {
  return (
    <MapContext.Provider value={{ ..._props }}>{children}</MapContext.Provider>
  );
};
