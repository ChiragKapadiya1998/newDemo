import type {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import {ApiError, axiosInstance} from './client';

export interface BaseQueryArgs {
  url: string;
  method: string;
  data?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
  skipLoader?: boolean;
  responseType?: AxiosRequestConfig['responseType'];
}

export const axiosBaseQuery: BaseQueryFn<
  BaseQueryArgs,
  unknown,
  ApiError
> = async args => {
  const {url, method, data, params, headers, responseType} = args;
  const methodUpper = String(method || 'GET').toUpperCase();
  const isBodyless =
    methodUpper === 'GET' || methodUpper === 'HEAD' || methodUpper === 'DELETE';

  try {
    const result = await axiosInstance.request({
      url,
      method,
      data: isBodyless ? undefined : data,
      params,
      responseType,
      headers: {
        ...headers,
        ...(isBodyless ? {'Content-Type': false as unknown as string} : null),
      },
    } as AxiosRequestConfig);

    return {data: result.data};
  } catch (rawError) {
    const error = rawError as AxiosError;
    const responseData = error.response?.data as {message?: string} | undefined;
    const status = error.response?.status;

    return {
      error: {
        status: status || 500,
        data: responseData ?? null,
        message: responseData?.message || error.message,
      } satisfies ApiError,
    };
  }
};
