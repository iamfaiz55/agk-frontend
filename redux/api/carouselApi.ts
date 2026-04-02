import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface CarouselItem {
    id: number;
    title?: string;
    description?: string;
    imageDesktop: string;
    imageMobile: string;
    link?: string;
    displayOrder: number;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const carouselApi = createApi({
    reducerPath: 'carouselApi',
    tagTypes: ['Carousel'],
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
        getCarousels: builder.query<CarouselItem[], void>({
            query: () => '/carousels/',
            providesTags: ['Carousel'],
        }),
        addCarousel: builder.mutation<CarouselItem, FormData>({
            query: (body) => ({ url: '/carousels/', method: 'POST', body }),
            invalidatesTags: ['Carousel'],
        }),
        updateCarousel: builder.mutation<CarouselItem, { id: number | string; data: Partial<CarouselItem> | FormData }>({
            query: ({ id, data }) => ({ url: `/carousels/${id}/`, method: 'PUT', body: data }),
            invalidatesTags: ['Carousel'],
        }),
        deleteCarousel: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/carousels/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Carousel'],
        }),
    }),
});

export const {
    useGetCarouselsQuery,
    useAddCarouselMutation,
    useUpdateCarouselMutation,
    useDeleteCarouselMutation,
} = carouselApi;
