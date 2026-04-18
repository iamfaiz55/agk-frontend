import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { User } from '../../types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.agkinfrastructures.com/api/auth',

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login/',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Users'],
        }),
        getUsers: builder.query<User[], void>({
            query: () => '/users/',
            providesTags: ['Users'],
        }),
        deleteUser: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/users/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUsersQuery,
    useDeleteUserMutation
} = authApi;
