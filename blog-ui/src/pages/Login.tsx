import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const loginData = { email, password };
  
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Resposta do backend:", response.data);
  
      const { token } = response.data;
  
      // Verificar se o campo 'user' existe
      if (response.data.user && response.data.user.name) {
        localStorage.setItem("username", response.data.user.name);
      } else {
        console.error("Usuário não encontrado ou nome não disponível");
      }
  
      localStorage.setItem("token", token);
  
      window.location.href = "/";
  
    } catch (err) {
      setError("Email ou senha incorretos. Tente novamente.");
      console.error("Erro ao fazer login:", err);
    }
  };
  
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Campo de Senha */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;