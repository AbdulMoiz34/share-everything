import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FileType } from "../../types/file";

interface fileState {
    files: FileType[];
    selectedIds: string[];
}

const initialState: fileState = {
    files: [],
    selectedIds: []
}

const uploadFile = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFiles(state, action: PayloadAction<FileType[]>) {
            state.files = action.payload;
            const valid = new Set(action.payload.map(f => f.public_id));
            state.selectedIds = state.selectedIds.filter(id => valid.has(id));
        },

        toggleSelect(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.selectedIds = state.selectedIds.includes(id) ?
                state.selectedIds.filter(x => x !== id) :
                [...state.selectedIds, id];
        },

        clearSelection(state) {
            state.selectedIds = [];
        },

        selectAll(state) {
            state.selectedIds = state.files.map(f => f.public_id);
        },
        
        removeFilesByIds(state, action: PayloadAction<string[]>) {
            const toRemove = new Set(action.payload);
            state.files = state.files.filter(f => !toRemove.has(f.public_id));
            state.selectedIds = state.selectedIds.filter(id => !toRemove.has(id));
        }
    }
});

export const { setFiles, toggleSelect, clearSelection, selectAll, removeFilesByIds } = uploadFile.actions;
export default uploadFile.reducer;