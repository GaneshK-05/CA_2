import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async () => {
    const response = await axios.post(`${BASE_URL}/public/token`, {
        studentId: "E0323029",
        set: "setA",
        password: "626448"
    });

    if (!response?.data?.token || !response?.data?.dataUrl) {
        throw new Error("Token response is missing token or dataUrl");
    }

    return {
        token: response.data.token,
        dataUrl: response.data.dataUrl
    };
};

export const getOrders = async () => {
  const { token, dataUrl } = await getToken();

  const response = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response?.data?.data ?? [];
};