import { useState } from "react";
import { listPostsDrafts } from "../services/postsServices";

const NewDraft = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await listPostsDrafts();
      setSuccess("Rascunho criado com sucesso!");
      setContent(""); 
    } catch {
      setError("Erro ao criar o rascunho.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <h1 className="text-2xl font-bold text-black px-8">Novo Rascunho</h1>
      </div>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Rascunho
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Escreva o conteúdo do seu rascunho aqui..."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Rascunho"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewDraft;