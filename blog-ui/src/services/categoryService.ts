import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', 
  auth: {
    username: 'user', 
    password: '598e143e-81e1-409f-a5d7-aba6fba586f2', 
  },
});

export interface CategoryDTO {
  id: number;
  name: string;
  postCount: number;
}

export const listCategories = async (): Promise<CategoryDTO[]> => {
  try {
    const response = await api.get('/api/v1/categories');
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error; 
  }
};