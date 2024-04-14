import { instance, setToken } from "./authService";

export const fetchDiary = async (token) => {
  setToken(`Bearer ${token}`);
  const { data } = await instance.get("/diary");
  return data
};

export const addDiary = async (body) => {
  const { data } = await instance.post("/diary", body);
  return data;
};

export const deleteDiary = async (id) => {
  const { data } = await instance.delete(`/diary/${id}`);
  return data;
};

export const updateDiary = async (id, body) => {
  const { data } = await instance.put(`/diary/${id}`, body);
  return data;
};
