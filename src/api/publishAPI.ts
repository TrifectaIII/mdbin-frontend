// A mock function to mimic making an async publish request
export const requestPublishDocument = async (text: string):
Promise<{key: string}> => {

    // Wait some time to mimic latency
    await new Promise((resolve) => {

        const ms = 500;
        setTimeout(resolve, ms);

    });

    return {key: 'someString'};

};
