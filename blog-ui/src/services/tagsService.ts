import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  auth: {
    username: 'user', 
    password: '598e143e-81e1-409f-a5d7-aba6fba586f2', 
  },
});

export interface TagsDTO {
    id: number;
    name: string;
    postCount: number;
}

export const listTags = async (): Promise<TagsDTO[]> => {
    try {
        const res = await api.get('/api/v1/tags');
        return res.data;
    } catch (error) {
        console.log("Erro ao buscar as tags", error);
        throw error;
    }
}

export const createTag = async (tag: { names: { name: string }[] }): Promise<TagsDTO[]> => {
  try {
    const res = await api.post('/api/v1/tags', tag);
    return res.data;
  } catch (error) {
    console.log("Erro ao postar tags", error);
    throw error;
  }
};

export const deleteTag = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/v1/tags/${id}`);
  } catch (error) {
    console.log("Erro ao deletar a tag", error);
    throw error;
  }
};

