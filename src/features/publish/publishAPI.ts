import {
    apiURL,
} from '../../constants';

export interface PublishData {
    text: string
    creator: string
    recaptchaToken: string
}

export interface PublishResponse {
    key: string
}

// Hits the API endpoint for publishing documents
export const requestPublishDocument =
    async (data: PublishData): Promise<PublishResponse> => {

        const URL = `${apiURL}/document/publish/`;

        const req = await fetch(URL, {
            method: 'POST',
            cache: 'no-cache',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });

        return await req.json() as PublishResponse;

    };
