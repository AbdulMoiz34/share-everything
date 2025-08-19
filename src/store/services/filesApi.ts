import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FileType } from "../../types/file";

export const filesApi = createApi({
    reducerPath: "filesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://share-everthing-backend-production-d5e7.up.railway.app" }),
    tagTypes: ["Files"],
    endpoints: (builder) => ({
        uploadToCloudinary: builder.mutation<FileType, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'fastshare098121321421');
                formData.append('cloud_name', 'moiz34');
                return {
                    url: "https://api.cloudinary.com/v1_1/moiz34/auto/upload",
                    method: "POST",
                    body: formData
                };
            },
            transformResponse: (
                response: { secure_url: string; public_id: string; resource_type: string; bytes: number },
                _meta,
                file: File
            ): FileType => ({
                url: response.secure_url,
                public_id: response.public_id,
                resource_type: response.resource_type,
                type: file.type,
                name: file.name,
                createdAt: Date.now(),
                fileSize: response.bytes
            }),
            invalidatesTags: ["Files"]
        }),
        deleteResource: builder.mutation<{ success: boolean }, { public_id: string, resource_type: string }>({
            query: (body) => ({
                url: "/api/delete-resource",
                method: "DELETE",
                body
            }),
            invalidatesTags: ["Files"]
        })
    })
});

export const { useDeleteResourceMutation, useUploadToCloudinaryMutation } = filesApi;


