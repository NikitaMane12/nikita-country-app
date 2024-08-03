import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Country from "./componets/Country";

import Register from "./componets/Register";
import Header from "./componets/Header";
import SearchBar from "./componets/SearchBar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Country />} />
        <Route path="/register" element={<Register />} />
        <Route path="serch" element={<SearchBar />} />
      </Routes>
    </>
  );
}

export default App;
