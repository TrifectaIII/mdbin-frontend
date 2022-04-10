// configuration constants pulled from env or defaulted

// endpoint for document api
export const apiEndpoint =
    process.env.REACT_APP_API_ENDPOINT ||
    // defaults to local development
    "http://localhost:8000/document/";

// site key for google recaptcha
export const recaptchaSiteKey =
    process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
    // defaults to the generic test key (test key always passes)
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
