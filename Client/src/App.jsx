import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Catalog from "./pages/Catalog";
import Wishlist from "./pages/Wishlist";
import Swipe from "./pages/Swipe";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/swipe" element={<Swipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
