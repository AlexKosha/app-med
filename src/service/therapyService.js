import axios from "axios";

axios.defaults.baseURL = "https://med-app-back.onrender.com";

export const getTherapy = async () => {
  const therapy = await axios.get("/therapy");
  return therapy.data;
};
