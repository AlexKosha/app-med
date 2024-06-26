import axios from "axios";

export const instance = axios.create({
  // baseURL: "https://med-app-back.onrender.com",
  baseURL: "http://192.168.1.193:3333",
});

export const setToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export const deleteToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const singUp = async (formData) => {
  const { data } = await instance.post("/users/register", formData, {
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

export const getProfile = async (token) => {
  setToken(`Bearer ${token}`);
  const { data } = await instance.get("/users/current");
  return data;
};

export const updateUser = async (body) => {
  const { data } = await instance.put("/users/update", body);
  return data;
};

export const updateAvatar = async (avatar) => {
  const res = await instance.patch("/users/updateAvatar", avatar, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
export const updatePassword = async (body) => {
  await instance.patch("/users/updatePassword", body);
  return;
};

export const verify = async () => {
  const data = await instance.post("/users/verify");
  return data;
};

export const forgotPass = async (body) => {
  const data = await instance.post("/users/forgotPassword", body);
  return data;
};

export const restorePassword = async (otp, body) => {
  const data = await instance.post(`/users//restorePassword/${otp}`, body);
};
