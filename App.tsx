import React from "react";
import { AppProvider } from "./Actions/provider";
import Location from "./Components/Location";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Location />
    </AppProvider>
  );
};

export default App;
