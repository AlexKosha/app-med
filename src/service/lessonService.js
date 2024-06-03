import { instance } from "./authService";

export const fetchLessons = async () => {
  const { data } = await instance.get("/lessons");
  return data;
};
