import { useEffect, useState } from "react";
import { TagsDTO, listTags, createTag, deleteTag } from "../services/tagsService";;

const Tags = () => {
  const [tags, setTags] = useState<TagsDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState<string>("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await listTags();
        setTags(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar as tags.");
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleCreateTag = async () => {
    if (!newTagName) {
      alert("Por favor, insira um nome para a tag.");
      return;
    }
  
    try {
      const newTag = await createTag({ names: [{ name: newTagName }] });
      setTags([...tags, ...newTag]);  
      setNewTagName("");
    } catch (error) {
      console.log(error);
      setError("Erro ao criar a tag.");
    }
  };

  const handleDeleteTag = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tag?")) return;

    try {
      await deleteTag(id);
      setTags(tags.filter(tag => tag.id !== id));
    } catch (error) {
      console.log(error);
      setError("Erro ao excluir a tag.");
    }
  };

  return (
    <section className="p-4 px-2">
      <div className="flex h-screen items-center justify-center p-5 bg-purple-100">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="w-full space-y-10 overflow-y-auto p-10 bg-white">
            <h1 className="text-black font-bold text-4xl">Tags</h1>
            <div className="my-4 border-t border-gray-300"></div>

            {loading && <p>Carregando tags...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex space-x-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nome da nova tag"
                className="px-4 py-2 border rounded"
              />
              <button
                onClick={handleCreateTag}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Criar Tag
              </button>
            </div>

            {!loading && !error && (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Nome</th>
                    <th className="px-4 py-2 border">Contagem de Posts</th>
                    <th className="px-4 py-2 border">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag) => (
                    <tr key={tag.id}>
                      <td className="px-4 py-2 border">{tag.name}</td>
                      <td className="px-4 py-2 border">{tag.postCount}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleDeleteTag(tag.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tags;
