import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDocument } from '@/types';
import { RootState } from '../store';

export const documentsApi = createApi({
    reducerPath: 'documentsApi',
    tagTypes: ['Documents'],
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
        getMyDocuments: builder.query<UserDocument[], void>({
            query: () => '/documents/my-documents',
            providesTags: ['Documents'],
        }),
        uploadAadhaar: builder.mutation<UserDocument, FormData>({
            query: (body) => ({
                url: '/documents/aadhaar',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Documents'],
        }),
        uploadPan: builder.mutation<UserDocument, FormData>({
            query: (body) => ({
                url: '/documents/pan',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Documents'],
        }),
        uploadIncomeProof: builder.mutation<UserDocument, FormData>({
            query: (body) => ({
                url: '/documents/income-proof',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Documents'],
        }),
        uploadAddressProof: builder.mutation<UserDocument, FormData>({
            query: (body) => ({
                url: '/documents/address-proof',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Documents'],
        }),
    }),
});

export const {
    useGetMyDocumentsQuery,
    useUploadAadhaarMutation,
    useUploadPanMutation,
    useUploadIncomeProofMutation,
    useUploadAddressProofMutation
} = documentsApi;
