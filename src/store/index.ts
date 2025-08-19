import { configureStore} from "@reduxjs/toolkit";
import fileReducer from "./reducers/fileReducer";
import uploadQueueReducer from "./reducers/uploadQueue";
import { filesApi } from "./services/filesApi";

const store = configureStore({
    reducer: {
        fileUpload: fileReducer,
        [filesApi.reducerPath]: filesApi.reducer,
        uploadQueue: uploadQueueReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(filesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;