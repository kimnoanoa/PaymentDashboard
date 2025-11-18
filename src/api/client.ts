import axios from "axios";

export const api = axios.create({
  baseURL: "https://recruit.paysbypays.com/api/v1",
  timeout: 5000,
});
