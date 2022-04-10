import { apiEndpoint } from "../../config";

export interface ViewResponse {
    text: string;
    published: number;
    documentKey: string;
}

// Hit the endpoint for fetching documents
export const requestViewDocument = async (
    documentKey: string,
): Promise<ViewResponse> => {
    const URL = `${apiEndpoint}?key=${encodeURIComponent(documentKey)}`;

    const req = await fetch(URL);

    const data = (await req.json()) as {
        text: string;
        published: number;
    };

    return {
        documentKey,
        ...data,
    };
};
