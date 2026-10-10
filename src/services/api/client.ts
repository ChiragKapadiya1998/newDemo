import axios, {AxiosError, AxiosInstance} from 'axios';
import {ACCESS_TOKEN, API, API_TIMEOUT} from '@/utils/apiConstant';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API.BASE_URL,
  timeout: API_TIMEOUT.DEFAULT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export interface ApiError {
  status: number;
  data: unknown;
  message: string;
}

export const apiCall = async <T = unknown>(config: {
  url: string;
  method: string;
  data?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
  skipLoader?: boolean;
}): Promise<T> => {
  const {skipLoader: _skipLoader, ...axiosConfig} = config;

  try {
    const response = await axiosInstance(axiosConfig);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const responseData = axiosError.response?.data as {message?: string} | null;
    const apiError: ApiError = {
      status: axiosError.response?.status || 500,
      data: axiosError.response?.data || null,
      message:
        responseData?.message ||
        axiosError.message ||
        'An unknown error occurred',
    };
    throw apiError;
  }
};

export const createCancellableRequest = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    signal,
    cancel: () => controller.abort(),
  };
};
