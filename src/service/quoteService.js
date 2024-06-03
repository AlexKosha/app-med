import { instance } from "./authService";

export const fetchQuotes = async () => {
  const { data } = await instance.get("/quotes");
  return data;
};
