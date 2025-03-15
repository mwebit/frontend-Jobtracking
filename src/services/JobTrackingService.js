import axios from "axios";

const API_URL = "http://localhost:5275/api/JobTrackingInfo";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const JobTrackingService = {
  getAllJobs: async () => {
    const response = await axiosInstance.get("");
    return response.data;
  },

  getJob: async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  },

  createJob: async (job) => {
    const response = await axiosInstance.post("", job);
    return response.data;
  },

  updateJob: async (job) => {
    const response = await axiosInstance.put("", job);
    return response.data;
  },

  deleteJob: async (id) => {
    await axiosInstance.delete(`/${id}`);
  },
};
