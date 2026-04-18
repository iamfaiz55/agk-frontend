import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Amenity } from '@/types';
import { RootState } from '../store';

export const amenitiesApi = createApi({
    reducerPath: 'amenitiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.agkinfrastructures.com/api',
        // baseUrl: 'http://localhost:3110/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Amenities', 'Projects'],
    endpoints: (builder) => ({
        getAmenities: builder.query<Amenity[], number | string | void>({
            query: (buildingId) => {
                const url = buildingId ? `/amenities/?buildingId=${buildingId}` : '/amenities/';
                return url;
            },
            providesTags: ['Amenities'],
        }),
        // We use 'Projects' tag as well because amenities are usually fetched via projects
        addAmenity: builder.mutation<Amenity, Partial<Amenity>>({
            query: (body) => ({
                url: '/amenities/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Amenities', 'Projects'],
        }),
        updateAmenity: builder.mutation<Amenity, { id: number | string; data: Partial<Amenity> }>({
            query: ({ id, data }) => ({
                url: `/amenities/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Amenities', 'Projects'],
        }),
        deleteAmenity: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/amenities/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Amenities', 'Projects'],
        }),
    }),
});

export const {
    useGetAmenitiesQuery,
    useAddAmenityMutation,
    useUpdateAmenityMutation,
    useDeleteAmenityMutation,
} = amenitiesApi;
