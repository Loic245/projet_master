import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "mobx-react";
import * as store from "./store";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider {...store}>
        <Router />
      </StoreProvider>
    </BrowserRouter>
    
  );
}

export default App;
