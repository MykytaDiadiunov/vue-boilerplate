import axios, { type AxiosRequestConfig } from 'axios';
import { useTokenStore } from '@/stores';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

instance.interceptors.request.use((config) => {
  const { token } = useTokenStore();

  if (token && config.headers) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export const apiService = {
  instance,

  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await instance.get<T>(url, config);
    return data;
  },

  async post<T = unknown>(url: string, payload?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await instance.post<T>(url, payload, config);
    return data;
  },

  async put<T = unknown>(url: string, payload?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await instance.put<T>(url, payload, config);
    return data;
  },

  async patch<T = unknown>(
    url: string,
    payload?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data } = await instance.patch<T>(url, payload, config);
    return data;
  },

  async del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await instance.delete<T>(url, config);
    return data;
  }
};
