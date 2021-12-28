// A mock function to mimic making an async request for data
export const fetchCount = async (amount = 1): Promise<{
    data: number
}> => {

    // Wait some time to mimic latency
    await new Promise((resolve) => {

        const ms = 500;
        setTimeout(resolve, ms);

    });

    return {data: amount};

};
