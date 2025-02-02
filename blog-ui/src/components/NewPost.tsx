import { useState } from "react";
import { Link } from "react-router-dom";

const NewPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Título:", title);
    console.log("Conteúdo:", content);
  };


  return (
    <div className="bg-gray-100">
      {/* Cabeçalho fixo */}
      <section className="sticky top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="text-sm flex justify-center gap-8 py-8">
            <button
              className="text-gray-600 hover:text-purple-600 flex items-center gap-2"
            >
              <Link to='/'>
              Voltar
              </Link>
            </button>
            <h1 className="text-2xl font-bold text-black px-8">Criar Novo Post</h1>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título do Post
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Digite o título do seu post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Conteúdo do Post
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Escreva o conteúdo do seu post aqui..."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
          >
            Publicar Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
