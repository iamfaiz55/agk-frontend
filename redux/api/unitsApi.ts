import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Unit, UnitRequest, CreateUnitRequestPayload } from '@/types';
import { RootState } from '../store';

const transformUnitResponse = (response: any): Unit[] => {
    const units = Array.isArray(response) ? response : [response];
    return units.map(unit => {
        if (unit.images) {
            try {
                const parsed = typeof unit.images === 'string' ? JSON.parse(unit.images) : unit.images;
                unit.images = (Array.isArray(parsed) ? parsed : []).map((img: any) => {
                    const url = typeof img === 'string' ? img : img.url;
                    return url.startsWith('http') ? url : `https://api.agkinfrastructures.com${url}`;
                });
            } catch {
                unit.images = [];
            }
        }
        return unit;
    });
};

export const unitsApi = createApi({
    reducerPath: 'unitsApi',
    tagTypes: ['Units', 'UnitRequests'],
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
        getUnits: builder.query<Unit[], { limit?: number; status?: string } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params) {
                    if (params.limit) queryParams.append('limit', params.limit.toString());
                    if (params.status) queryParams.append('status', params.status);
                }
                const qs = queryParams.toString();
                return `/units/${qs ? '?' + qs : ''}`;
            },
            providesTags: ['Units'],
            transformResponse: (response: Unit[]) => transformUnitResponse(response)
        }),
        getUnitById: builder.query<Unit, number | string>({
            query: (id) => `/units/${id}/`,
            providesTags: ['Units'],
            transformResponse: (response: Unit) => {
                const parseJson = (field: unknown): string[] => {
                    if (Array.isArray(field)) return field as string[];
                    if (typeof field === 'string') {
                        try {
                            return JSON.parse(field);
                        } catch {
                            return [];
                        }
                    }
                    return [];
                };

                // Transform Unit Images
                const [transformed] = transformUnitResponse(response);
                const updatedResponse = { ...transformed };

                if (updatedResponse.building) {
                    const building = updatedResponse.building;
                    const commercialFeatures = parseJson(building.commercialFeatures);
                    const residentialFeatures = parseJson(building.residentialFeatures);
                    const investmentPoints = parseJson(building.investmentPoints);

                    const rawImages = (typeof building.images === 'string' ? parseJson(building.images) : building.images) as unknown as any[];
                    const images = (Array.isArray(rawImages) ? rawImages : []).map(section => ({
                        title: section.title || 'General',
                        images: (Array.isArray(section.images) ? section.images : []).map((url: string) => 
                            url.startsWith('http') ? url : `https://api.agkinfrastructures.com${url}`
                        )
                    }));

                    updatedResponse.building = {
                        ...building,
                        images,
                        commercialFeatures,
                        residentialFeatures,
                        investmentPoints
                    };
                }
                return updatedResponse;
            }
        }),
        getBuildingUnits: builder.query<Unit[], number | string>({
            query: (id) => `/projects/${id}/units/`,
            providesTags: ['Units'],
            transformResponse: (response: Unit[]) => transformUnitResponse(response)
        }),
        addUnit: builder.mutation<Unit, FormData>({
            query: (body) => ({ url: '/units/', method: 'POST', body }),
            invalidatesTags: ['Units'],
        }),
        updateUnit: builder.mutation<Unit, { id: number | string; data: FormData }>({
            query: ({ id, data }) => ({ url: `/units/${id}/`, method: 'PUT', body: data }),
            invalidatesTags: ['Units'],
        }),
        deleteUnit: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/units/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Units'],
        }),
        // Unit Requests
        createUnitRequest: builder.mutation<UnitRequest, CreateUnitRequestPayload>({
            query: (body) => ({ url: '/unit-requests/', method: 'POST', body }),
            invalidatesTags: ['UnitRequests'],
        }),
        getUserUnitRequests: builder.query<UnitRequest[], string | number>({
            query: (userId) => `/unit-requests/user/${userId}/`,
            providesTags: ['UnitRequests'],
        }),
        updateUnitRequestStatus: builder.mutation<UnitRequest, { id: number | string; status: string }>({
            query: ({ id, status }) => ({ url: `/unit-requests/${id}/`, method: 'PUT', body: { status } }),
            invalidatesTags: ['UnitRequests'],
        }),
        deleteUnitRequest: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/unit-requests/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['UnitRequests'],
        }),
    }),
});


export const {
    useGetUnitsQuery,
    useGetUnitByIdQuery,
    useGetBuildingUnitsQuery,
    useAddUnitMutation,
    useUpdateUnitMutation,
    useDeleteUnitMutation,
    useCreateUnitRequestMutation,
    useGetUserUnitRequestsQuery,
    useUpdateUnitRequestStatusMutation,
    useDeleteUnitRequestMutation,
} = unitsApi;
