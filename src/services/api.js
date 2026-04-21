import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

let dataset = [];

export const getToken = async () => {
try{
const response = await axios.post(`${BASE_URL}/public/token`, {
"studentId": "E0323029",
"set": "setA",
"password" : "626448"
});

console.log(response.data)
const token = response.data.token;
const dataUrl = response.data.dataUrl;

const response2 = await axios.get(`${BASE_URL}${dataUrl}`, {
headers: { "Authorization": `Bearer ${token}` },
});

dataset = response2.data.data;

app.listen(PORT, () => {
console.log(`Server is running ${PORT}`);
});
} catch(err){
console.log(err);
}
};

app.get("/" , (req,res) => {
res.json({
messeage : "Server is running "
})
});

app.get("/employees" , (req,res) => {
res.json({
data : dataset
})
});

export const getOrders = async (token) => {
  const res = await axios.get("/private/data", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};