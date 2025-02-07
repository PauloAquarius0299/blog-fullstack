import { useState, useEffect } from "react";
import { CategoryDTO, listCategories, createCategory, deleteCategory } from "../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await listCategories();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0]);
      }
    } catch (err) {
      setError("Erro ao carregar categorias.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const newCategory = await createCategory({ name: newCategoryName });
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
      setSelectedCategory(null);
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  return (
    <section className="p-4 px-2">
      <div className="flex h-screen items-center justify-center p-5 bg-purple-100">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="w-full space-y-10 overflow-y-auto p-10 bg-white">
            <h1 className="text-black font-bold text-4xl">Categorias</h1>

            <div className="my-4 border-t border-gray-300"></div>

            {loading && <p>Carregando categorias...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-6">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nova Categoria"
                className="border p-2 mr-2"
              />
              <button
                onClick={handleCreateCategory}
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
              >
                Criar Categoria
              </button>
            </div>

            {categories.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Todas as Categorias - <span className="text-purple-600">{categories.length}</span>
                </h2>
                <div className="flex flex-col space-y-2 border-b border-gray-300 pb-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <span
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer text-lg font-semibold transition-colors duration-200 ${
                          selectedCategory?.id === category.id
                            ? "text-purple-600 border-b-4 border-purple-500"
                            : "text-gray-600 hover:text-purple-500"
                        }`}
                      >
                        {category.name} - <span className="text-purple-500">{category.postCount} Posts</span>
                      </span>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Deletar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Detalhes da Categoria</h2>
                <p>
                  <strong>Id:</strong> {selectedCategory.id}
                </p>
                <p>
                  <strong>Nome:</strong> {selectedCategory.name}
                </p>
                <p>
                  <strong>Quantidade de Posts:</strong> {selectedCategory.postCount}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
