import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPost } from "../services/postsServices";
import { listCategories } from "../services/categoryService";
import { listTags } from "../services/tagsService";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState<string>(""); 
  const [tagIds, setTagIds] = useState<string[]>([]); 
  const [readingTime, setReadingTime] = useState(0);
  const [postStatus, setPostStatus] = useState("DRAFT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await listCategories();
        const tagsData = await listTags();
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        console.error("Erro ao carregar categorias e tags", err);
        setError("Erro ao carregar categorias e tags.");
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postData = {
        title,
        content,
        author,
        category: categoryId, 
        tags: tagIds, 
        readingTime,
        postStatus,
      };

      const response = await createPost(postData);
      console.log("Post criado com sucesso:", response);
      setTitle("");
      setContent("");
      setAuthor("");
      setCategoryId("");
      setTagIds([]);
      setReadingTime(0);
      setPostStatus("DRAFT");
      alert("Post publicado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar post:", err);
      setError("Erro ao criar post. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <section className="sticky top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="text-sm flex justify-center gap-8 py-8">
            <button className="text-gray-600 hover:text-purple-600 flex items-center gap-2">
              <Link to="/">Voltar</Link>
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Autor
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Digite o nome do autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <select
              id="tags"
              name="tags"
              multiple
              value={tagIds}
              onChange={(e) => setTagIds(Array.from(e.target.selectedOptions, option => option.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700">
              Tempo de Leitura (em minutos)
            </label>
            <input
              type="number"
              id="readingTime"
              name="readingTime"
              placeholder="Digite o tempo de leitura"
              value={readingTime}
              onChange={(e) => setReadingTime(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postStatus" className="block text-sm font-medium text-gray-700">
              Status do Post
            </label>
            <select
              id="postStatus"
              name="postStatus"
              value={postStatus}
              onChange={(e) => setPostStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Publicando..." : "Publicar Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
