import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UploadStatus = "queued" | "uploading" | "success" | "error";

export interface UploadQueueItem {
    id: string;
    name: string;
    type: string;
    size: number;
    createdAt: number;
    status: UploadStatus;
    errorMessage?: string;
    previewUrl?: string;
}

interface UploadQueueState {
    items: UploadQueueItem[];
}

const initialState: UploadQueueState = {
    items: []
};

const uploadQueueSlice = createSlice({
    name: "uploadQueue",
    initialState,
    reducers: {
        enqueueUploads(state, action: PayloadAction<UploadQueueItem[]>) {
            state.items = [...state.items, ...action.payload];
        },
        setUploadStatus(state, action: PayloadAction<{ id: string; status: UploadStatus; errorMessage?: string }>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.status = action.payload.status;
                if (action.payload.errorMessage) item.errorMessage = action.payload.errorMessage;
            }
        },
        removeFromQueue(state, action: PayloadAction<string[]>) {
            const idSet = new Set(action.payload);
            state.items = state.items.filter(i => !idSet.has(i.id));
        },
        clearCompleted(state) {
            state.items = state.items.filter(i => i.status !== "success");
        }
    }
});

export const { enqueueUploads, setUploadStatus, removeFromQueue, clearCompleted } = uploadQueueSlice.actions;
export default uploadQueueSlice.reducer;



