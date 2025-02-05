import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import Header from "./components/Header";
import Login from "./pages/Login";
import './index.css';
import NewPost from "./components/NewPost";
import NewDraft from "./components/NewDraft";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <Header />}
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path='/posts' element={<NewPost />} />
        <Route path='/posts/drafts' element={<NewDraft />} /> 
      </Routes>
    </>
  );
}
