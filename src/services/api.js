import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";
const REQUEST_TIMEOUT_MS = 15000;
const MAX_RETRIES = 2;

const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT_MS
});

const buildDataUrl = dataUrl =>
  dataUrl.startsWith("http://") || dataUrl.startsWith("https://")
    ? dataUrl
    : `${BASE_URL}${dataUrl}`;

const extractOrders = responseData => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.orders)) return responseData.orders;
  return [];
};

const fetchWithRetry = async operation => {
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === MAX_RETRIES) break;
    }
  }

  throw lastError;
};

export const getToken = async () => {
  const response = await fetchWithRetry(() =>
    apiClient.post(`${BASE_URL}/public/token`, {
      studentId: "E0323029",
      set: "setA",
      password: "626448"
    })
  );

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
  const requestUrl = buildDataUrl(dataUrl);

  const response = await fetchWithRetry(() =>
    apiClient.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

  return extractOrders(response?.data);
};