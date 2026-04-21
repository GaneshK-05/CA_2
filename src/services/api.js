import axios from "axios";

Base_URL = https://t4e-testserver.onrender.com/api

export const getToken = async () => {
  const res = await axios.post("/public/token", {
    studentId: "E0323029",
    set: "setA",
    password: "626448"
  });
  return res.data.token;
};

export const getOrders = async (token) => {
  const res = await axios.get("/private/data", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};