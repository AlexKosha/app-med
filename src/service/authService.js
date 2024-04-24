import axios from "axios";

export const instance = axios.create({
  baseURL: "https://med-app-back.onrender.com",
});

export const setToken = (token) => {
  instance.defaults.headers.common["Authorization"];
};

export const deleteToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const singUp = async (body) => {
  const { data } = await instance.post("/users/register", body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  setToken(`Bearer ${data.token}`);
  return data;
};

export const logIn = async (body) => {
  const { data } = await instance.post("/users/login", body);

  setToken(`Bearer ${data.token}`);
  return data;
};

export const logout = async () => {
  try {
    await instance.post("/users/logout");
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  const { data } = await instance.get("/users/current");
  return data;
};

export const updateUser = async (body) => {
  const { data } = await instance.patch("/users/update", body);
  return data;
};

export const verify = async () => {
  const data = await instance.post("/users/verify");
  return data;
};
