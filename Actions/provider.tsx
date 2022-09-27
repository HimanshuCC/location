import React, { createContext, PropsWithChildren, useState } from "react";

interface Location {
  locationName: string;
  timeAndDate: number;
  lat: number;
  lon: number;
}

interface AppContext {
  addLocation: (value: Location) => void;
  locations: Array<Location>;
  clearLocation: () => void;
  removeLocation: (index: number) => void;
}

const defaultValues: AppContext = {
  locations: [],
  addLocation: () => {},
  clearLocation: () => {},
  removeLocation: () => {},
};

export const AppContext = createContext<AppContext>(defaultValues);

export const AppProvider: React.FC<PropsWithChildren> = (props) => {
  const [locations, setLocation] = useState<Array<Location>>([]);

  const addLocation = (value: Location) => {
    setLocation((ps) => [...ps, value]);
  };

  const clearLocation = () => {
    setLocation([]);
  };

  const removeLocation = (index: number) => {
    setLocation((ps) => {
      ps.splice(index, 1);
      return ps;
    });
  };

  return (
    <AppContext.Provider
      value={{ locations, addLocation, clearLocation, removeLocation }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
