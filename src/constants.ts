// constants pulled from env or defaulted

export const apiEndpoint =
    process.env.REACT_APP_API_ENDPOINT ||
    // defaults to local development
    'http://localhost:8000/document/';
export const recaptchaSiteKey =
    process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
    // defaults to the test key (test key always passes)
    '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
