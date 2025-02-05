import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    window.location.href = "/auth"; 
  };

  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="text-sm flex justify-center gap-8 py-8">
          <h1 className="text-2xl font-bold text-black px-8">Blog Java e React</h1>
          <nav className="hidden md:flex gap-6 font-bold text-black/60 items-center text-xl">
            <Link to="/" className="hover:text-purple-500">Home</Link>
            <Link to="/categories" className="hover:text-purple-500">Categorias</Link>
            <Link to="/tags" className="hover:text-purple-500">Tags</Link>
          </nav>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-400 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center">
            <Link to='/posts'>+ Novo Post</Link>
          </button>
          <button className="bg-rose-400 cursor-pointer hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center">
            <Link to='/posts/drafts'>Rascunho</Link>
          </button>
        </div>

        {username ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-bold">Olá, {username}!</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Sair
            </button>
          </div>
        ) : (
          <button className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center">
            <Link to="/auth">Login</Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
