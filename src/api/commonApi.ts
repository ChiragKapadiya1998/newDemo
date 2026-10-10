import {createApi} from '@reduxjs/toolkit/query/react';
import {API, GET} from '@/utils/apiConstant';
import {axiosBaseQuery} from '@/services/api/baseQuery';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Dashboard', 'Explore'],
  endpoints: builder => ({
    getDashboard: builder.query<unknown, void>({
      query: () => ({
        url: API.getDashboard,
        method: GET,
        skipLoader: true,
      }),
      providesTags: ['Dashboard'],
    }),
    getExplore: builder.query<any, {folder_id: string; limit?: number}>({
      query: ({folder_id, limit = 30}) => ({
        url: API.explore,
        method: GET,
        params: {folder_id, limit},
        skipLoader: true,
      }),
      providesTags: ['Explore'],
    }),
  }),
});

export const {useGetDashboardQuery, useGetExploreQuery} = commonApi;
