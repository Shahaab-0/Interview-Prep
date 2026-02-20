import React from "react";
import Pagination from "./pagination/Pagination";
import DynamicJsxBuilder from "./dynamicJsxBuilder/DynamicJsxBuilder";
import Autocomplete from "./autocomplete/Autocomplete";
import Posts from "./dataFetching/Posts";
import { MainRoutes } from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
      <BrowserRouter>
    <AuthProvider>

        <MainRoutes />
    </AuthProvider>

      </BrowserRouter>
  );
}

export default App;
