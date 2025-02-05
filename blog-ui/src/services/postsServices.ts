import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // URL do seu backend
  auth: {
    username: 'user',
    password: '598e143e-81e1-409f-a5d7-aba6fba586f2',
  },
});

// Definindo a interface dos posts
export interface PostsDTO {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  postStatus: string;
}

export const listPosts = async (): Promise<PostsDTO[]> => {
  try {
    const response = await api.get('/api/v1/posts');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export const listPostsDrafts = async (): Promise<PostsDTO[]> => {
    try {
      const response = await api.get('/api/v1/posts/drafts');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar rascunhos:', error);
      throw error;
    }
  };
  