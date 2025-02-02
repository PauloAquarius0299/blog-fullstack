import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import Header from "./components/Header";
import './index.css'

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </>
  );
}
