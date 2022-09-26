import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { Location } from "react-native-get-location";

interface AppContext {
  addLocation: (value: Location) => void;
  locations: Array<Location>;
}

const defaultValues: AppContext = {
  locations: [],
  addLocation: () => {},
};

export const AppContext = createContext<AppContext>(defaultValues);

export const AppProvider: React.FC<PropsWithChildren> = (props) => {
  const [locations, setLocation] = useState<Array<Location>>([]);

  const addLocation = (value: Location) => {
    setLocation([...locations, value]);
  };

  return (
    <AppContext.Provider value={{ locations, addLocation }}>
      {props.children}
    </AppContext.Provider>
  );
};
