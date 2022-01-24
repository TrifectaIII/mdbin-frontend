import {
    apiURL,
} from '../../constants';

export interface ViewResponse {
    text: string
    published: string
    documentKey: string
}

// Hit the endpoint for fetching documents
export const requestViewDocument =
    async (documentKey: string): Promise<ViewResponse> => {

        const URL = `${apiURL}/document/get/${documentKey}/`;

        const req = await fetch(URL);

        const data = await req.json() as {
            text: string
            published: string
        };

        return {
            documentKey,
            ...data,
        };

    };
