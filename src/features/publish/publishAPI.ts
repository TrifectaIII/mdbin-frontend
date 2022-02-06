import {
    apiEndpoint,
} from '../../constants';

export interface PublishData {
    text: string
    creator: string
    recaptchaToken: string
}

export interface PublishResponse {
    type: 'response'
    key: string
}

export interface PublishError {
    type: 'error'
    message: string
}

const STATUS_SUCCESS = 200;

// Hits the API endpoint for publishing documents
export const requestPublishDocument =
    async (data: PublishData): Promise<PublishResponse | PublishError> => {

        const req = await fetch(apiEndpoint, {
            method: 'POST',
            cache: 'no-cache',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });

        // return an error if the request did not succeed
        if (req.status !== STATUS_SUCCESS) return {
            type: 'error',
            message: await req.text(),
        } as PublishError;

        // otherwise return sucessful response
        return {
            type: 'response',
            ...await req.json(),
        } as PublishResponse;

    };
