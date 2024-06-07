import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Book from "./views/Book";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path="/book/:title" element={<Book />} />
    </Routes>
  );
}

export default App;
