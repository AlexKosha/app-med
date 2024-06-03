import { instance } from "./authService";

export const fetchGroups = async () => {
  const { data } = await instance.get("/groups");
  return data;
};
