import { useState } from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams";
import PetDetails from "./PetDetails";
import AdpotPetContext from "./adoptPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdpotPetContext.Provider value={adoptedPet}>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Routes>
       <Route path="/details/:id" element={<PetDetails />} />
       <Route path="/" element={<SearchParams />} /> 
      </Routes>
      </AdpotPetContext.Provider>
      </QueryClientProvider>
  </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
