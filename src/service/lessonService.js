import { instance } from "./authService";

export const fetchLessons = async (groupId) => {
  const { data } = await instance.get(`/lessons/${groupId}`);
  return data;
};
