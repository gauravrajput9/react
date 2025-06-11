import axios from "axios";

const api = axios.create({
    baseURL: "https://v6.exchangerate-api.com/v6/49218689b190e7e3f2636037"
})

export const getPosts = async (from, to, amount) => {
    return api.get(`/pair/${from}/${to}/${amount}`);
}