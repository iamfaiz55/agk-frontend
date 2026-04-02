
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GalleryItem } from '@/types';
import { RootState } from '../store';

export const galleryApi = createApi({
    reducerPath: 'galleryApi',
    tagTypes: ['Gallery'],
    keepUnusedDataFor: 3600, // Cache data for 1 hour
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.agkinfrastructures.com/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getGalleries: builder.query<GalleryItem[], { buildingId?: number | string } | void>({
            query: (params) => {
                if (params && params.buildingId) {
                    return `/gallery/?buildingId=${params.buildingId}`;
                }
                return '/gallery/';
            },
            providesTags: ['Gallery'],
            transformResponse: (response: GalleryItem[]) => {
                return response.map(item => ({
                    ...item,
                    imageUrl: item.imageUrl.startsWith('http') ? item.imageUrl : `https://api.agkinfrastructures.com${item.imageUrl}`
                }));
            }
        }),
        createGallery: builder.mutation<GalleryItem, FormData>({
            query: (body) => ({
                url: '/gallery/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Gallery'],
        }),
        deleteGallery: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/gallery/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Gallery'],
        }),
    }),
});

export const {
    useGetGalleriesQuery,
    useCreateGalleryMutation,
    useDeleteGalleryMutation,
} = galleryApi;
