import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Building } from '../../types';

export interface Floor {
    id: number;
    name: string;
    description?: string;
    buildingId: number;
    createdAt: string;
    updatedAt: string;
    building?: Building;
}

export const floorsApi = createApi({
    reducerPath: 'floorsApi',
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
    tagTypes: ['Floors'],
    endpoints: (builder) => ({
        getFloors: builder.query<Floor[], { buildingId?: number } | void>({
            query: (params) => {
                const url = params?.buildingId ? `/floors/?buildingId=${params.buildingId}` : '/floors/';
                return url;
            },
            providesTags: ['Floors'],
        }),
        getFloorById: builder.query<Floor, number>({
            query: (id) => `/floors/${id}/`,
            providesTags: ['Floors'],
        }),
        getBuildingFloorCount: builder.query<{ buildingId: string, floorCount: number }, number>({
            query: (buildingId) => `/floors/count/${buildingId}/`,
            providesTags: ['Floors'],
        }),
        addFloor: builder.mutation<Floor, Partial<Floor>>({
            query: (body) => ({
                url: '/floors/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Floors'],
        }),
        updateFloor: builder.mutation<Floor, { id: number; data: Partial<Floor> }>({
            query: ({ id, data }) => ({
                url: `/floors/${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Floors'],
        }),
        deleteFloor: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `/floors/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Floors'],
        }),
    }),
});

export const {
    useGetFloorsQuery,
    useGetFloorByIdQuery,
    useGetBuildingFloorCountQuery,
    useAddFloorMutation,
    useUpdateFloorMutation,
    useDeleteFloorMutation,
} = floorsApi;
