import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FileType } from "../../types/file";

interface fileState {
    files: FileType[];
}

const initialState: fileState = {
    files: []
}

const uploadFile = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFiles(state, action: PayloadAction<FileType[]>) {
            state.files = action.payload;
        }
    }
});

export const { setFiles } = uploadFile.actions;
export default uploadFile.reducer;