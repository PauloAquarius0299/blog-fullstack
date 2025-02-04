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

export interface CreateCategoryRequest {
  name: string;
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

export const createCategory = async (category: CreateCategoryRequest): Promise<CategoryDTO> => {
  try {
    const response = await api.post('/api/v1/categories', category);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/v1/categories/${id}`);
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
};
