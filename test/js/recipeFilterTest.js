const axios = require('axios');

describe('Include test', () => {
    it('0 item test', async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: [],
                include_filter: []
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(0);
    });

    it('1 item test', async() => {

        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: [],
                include_filter: ["bread"]
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(3);
    });

    it('2 item test', async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: [],
                include_filter: ["bread","butter"]
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(1);
        expect(res.data['1']).toBe('1');
    });

    it('3 item test', async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: [],
                include_filter: ["bread","butter","lamb"]
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(0);
    });
});

describe("Include Exclude Test", () => {
    it("1 Include 1 Exclude Test", async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: ["cheese"],
                include_filter: ["bread"]
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(1);
    })
})