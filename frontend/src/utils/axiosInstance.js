import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const register = async (email, name, password) => {
 return axios.post(`${API_URL}/signup`, { email, name, password });
};

export const login = async (email, password) => {
 return axios.post(`${API_URL}/login`, { email, password });
};

export const getProfile = async (token) => {
 return axios.get(`${API_URL}/api/user`, {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 });
};

export const getNotes = async (token) => {
 return axios.get(`${API_URL}/api/notes`, {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 });
};

export const deleteNote = async (id, token) => {
 try {
  const response = await axios.delete(`${API_URL}/api/deletenote`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
   data: {
    id: id,
   },
  });
  return response.data;
 } catch (error) {
  console.error(error);
  throw error;
 }
};

export const addNote = async (title, content, isPinned, tags, token) => {
 try {
  const response = await axios.post(
   `${API_URL}/api/addnote`,
   {
    title: title,
    content: content,
    isPinned: isPinned,
    tags: tags,
   },
   {
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return response.data;
 } catch (error) {
  console.error(error);
  throw error;
 }
};

export const editNote = async (id, title, content, tags, token) => {
 try {
  await axios.put(
   `${API_URL}/api/editnote/${id}`,
   {
    title: title,
    content: content,
    tags: tags,
   },
   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
 } catch (error) {
  console.error(error);
  throw error;
 }
};
