import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiossecure = () => {
  const { user } = useAuth;

  useEffect(() => {
    // intercept Request
    axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
  }, [user]);
  return axiosSecure;
};

export default useAxiossecure;
