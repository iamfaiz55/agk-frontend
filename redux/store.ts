import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from './api/authApi';
import { projectsApi } from './api/projectsApi';
import { amenitiesApi } from './api/amenitiesApi';
import { carouselApi } from './api/carouselApi';
import { floorsApi } from './api/floorsApi';
import { unitsApi } from './api/unitsApi';

import { documentsApi } from './api/documentsApi';
import { galleryApi } from './api/galleryApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
        [amenitiesApi.reducerPath]: amenitiesApi.reducer,
        [carouselApi.reducerPath]: carouselApi.reducer,
        [floorsApi.reducerPath]: floorsApi.reducer,
        [unitsApi.reducerPath]: unitsApi.reducer,
        [documentsApi.reducerPath]: documentsApi.reducer,
        [galleryApi.reducerPath]: galleryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware, 
            projectsApi.middleware, 
            amenitiesApi.middleware,
            carouselApi.middleware,
            floorsApi.middleware,
            unitsApi.middleware,
            documentsApi.middleware,
            galleryApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
