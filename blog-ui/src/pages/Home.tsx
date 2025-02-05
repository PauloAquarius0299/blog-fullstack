import React, { useEffect, useState } from 'react';
import { listPosts, PostsDTO } from '../services/postsServices';


const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostsDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await listPosts(); 
        setPosts(fetchedPosts);
      } catch (err) {
        console.log(err)
        setError('Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="p-4 px-2">
      <div className="flex h-screen items-center justify-center p-5 bg-purple-100">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="w-full space-y-10 overflow-y-auto p-10 bg-white">
            <h1 className="text-black font-bold text-4xl">Tml dos Blogs</h1>

            <div className="flex gap-4">
              <button className="px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                Jogos
              </button>
              <button className="px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                Viagens
              </button>
              <button className="px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                Tecnologia
              </button>
              <button className="px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                Economia
              </button>
              <button className="px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                Esportes
              </button>
              <button className="px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">
                Entretenimento
              </button>
            </div>

            <div className="my-4 border-t border-gray-300"></div>

            {loading ? (
              <div className="text-center text-lg text-gray-600">Carregando...</div>
            ) : error ? (
              <div className="text-center text-lg text-red-600">{error}</div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <div key={post.id} className="p-5 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-500">Autor: {post.author}</p>
                    <p className="mt-2 text-gray-700">{post.content.slice(0, 200)}...</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <span className="mr-2">{post.category}</span>|
                      <span className="ml-2">{post.readingTime} min de leitura</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
