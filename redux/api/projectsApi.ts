import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Building, BuildingImage, Lead, AdminStats } from '@/types';
import { RootState } from '../store';

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    tagTypes: ['Projects', 'Leads'],
    keepUnusedDataFor: 3600, // Cache data for 1 hour
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
    endpoints: (builder) => ({
        getProjects: builder.query<Building[], { includeUnits?: boolean } | void>({
            query: (params) => {
                if (params && typeof params === 'object') {
                    if (params.includeUnits === false) return '/projects/?include_units=false';
                    if (params.includeUnits === true) return '/projects/?include_units=true';
                }
                return '/projects/';
            },
            providesTags: ['Projects'],
            transformResponse: (response: Building[]) => {
                return response.map(project => {
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

                    const commercialFeatures = parseJson(project.commercialFeatures);
                    const residentialFeatures = parseJson(project.residentialFeatures);
                    const investmentPoints = parseJson(project.investmentPoints);

                    // images comes as BuildingImageSection[] or stringified BuildingImageSection[]
                    const rawImages = (typeof project.images === 'string' ? parseJson(project.images) : project.images) as unknown as any[];

                    const images = (Array.isArray(rawImages) ? rawImages : []).map(section => ({
                        title: section.title || 'General',
                        images: (Array.isArray(section.images) ? section.images : []).map((url: string) =>
                            url.startsWith('http') ? url : `https://api.agkinfrastructures.com${url}`
                        )
                    }));

                    return {
                        ...project,
                        images,
                        commercialFeatures,
                        residentialFeatures,
                        investmentPoints
                    } as Building;
                });
            },
        }),
        addProject: builder.mutation<Building, FormData>({
            query: (formData) => ({ url: '/projects/', method: 'POST', body: formData }),
            invalidatesTags: ['Projects'],
        }),
        updateProject: builder.mutation<Building, { id: number | string; formData: FormData }>({
            query: ({ id, formData }) => ({ url: `/projects/${id}/`, method: 'PUT', body: formData }),
            invalidatesTags: ['Projects'],
        }),
        deleteProject: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/projects/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Projects'],
        }),
        // Images / Gallery
        uploadImage: builder.mutation<BuildingImage, FormData>({
            query: (body) => ({ url: '/upload/', method: 'POST', body }),
            invalidatesTags: ['Projects'],
        }),
        deleteImage: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/images/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Projects'],
        }),
        // Leads
        getLeads: builder.query<Lead[], void>({
            query: () => '/leads/',
            providesTags: ['Leads'],
        }),
        createLead: builder.mutation<Lead, Partial<Lead>>({
            query: (body) => ({ url: '/leads/', method: 'POST', body }),
            invalidatesTags: ['Leads'],
        }),
        updateLeadStatus: builder.mutation<Lead, { id: number | string; status: string }>({
            query: ({ id, status }) => ({ url: `/leads/${id}/`, method: 'PUT', body: { status } }),
            invalidatesTags: ['Leads'],
        }),
        deleteLead: builder.mutation<void, number | string>({
            query: (id) => ({ url: `/leads/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Leads'],
        }),
        // Admin Stats
        getAdminStats: builder.query<AdminStats, void>({
            query: () => '/stats/',
            providesTags: ['Leads', 'Projects'],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useUploadImageMutation,
    useDeleteImageMutation,
    useGetLeadsQuery,
    useCreateLeadMutation,
    useUpdateLeadStatusMutation,
    useDeleteLeadMutation,
    useGetAdminStatsQuery,
} = projectsApi;
