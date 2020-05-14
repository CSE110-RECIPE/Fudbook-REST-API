const axios = require('axios');

describe('Include test', () => {

    it('1 item test', async() => {

        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: [],
                include_filter: ["bread"],
            }
        };

        const res = await axios(options);

        expect(Object.keys(res.data).length).toBe(3);
    })
})