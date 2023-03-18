const BACKEND_URL = process.env.BACKEND_URL

export const callAPI = async (url) => {
    try {
        const res = await fetch(
            `${process.env.BACKEND_URL}${url}`,
            {
                method: 'GET',
                headers: {
                   
                },
            }
        );
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

