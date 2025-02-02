import { useState, useEffect } from "react";
import { CategoryDTO, listCategories } from "../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0]); // Seleciona a primeira categoria por padrão
        }
      } catch (err) {
        setError("Erro ao carregar categorias.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="p-4 px-2">
      <div className="flex h-screen items-center justify-center p-5 bg-purple-100">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="w-full space-y-10 overflow-y-auto p-10 bg-white">
            <h1 className="text-black font-bold text-4xl">Categorias</h1>

            <div className="my-4 border-t border-gray-300"></div>

            {loading && <p>Carregando categorias...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {categories.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Todas as Categorias - <span className="text-purple-600">{categories.length}</span>
                </h2>
                <div className="flex space-x-6 border-b border-gray-300 pb-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer text-lg font-semibold transition-colors duration-200 ${
                        selectedCategory?.id === category.id
                          ? "text-purple-600 border-b-4 border-purple-500"
                          : "text-gray-600 hover:text-purple-500"
                      }`}
                    >
                      {category.name} - <span className="text-purple-500">{category.postCount} Posts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Detalhes da Categoria</h2>
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
