const idToFile = new Map<string, File>();

export const UploadManager = {
    add(id: string, file: File) {
        idToFile.set(id, file);
    },
    get(id: string): File | undefined {
        return idToFile.get(id);
    },
    remove(id: string) {
        idToFile.delete(id);
    },
    clear(ids: string[]) {
        for (const id of ids) idToFile.delete(id);
    }
};