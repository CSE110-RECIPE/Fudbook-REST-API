const axios = require('axios');

describe('Include test', () => {
    it('0 include filter test', async() => {
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

    it('1 include filter test', async() => {

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

    it('2 include filter test', async() => {
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
    });
});

describe("Exclude Test", () => {
    it("1 exclude filter test", async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: ["soy"],
                include_filter: []
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(28);
    })

    it("2 exclude filter test", async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: ["soy", "chicken"],
                include_filter: []
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(26);
    })

    it("3 exclude filter test", async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: ["soy", "chicken", "kale"],
                include_filter: []
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(24);
    })
})

describe("Include Exclude Test", () => {
    it("1 include 1 exclude Test", async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: ["butter"],
                include_filter: ["bread"]
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(2);
    })

    it("2 include 1 exclude", async() => {
        const options = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/filter',
            headers: {'Content-Type': 'application/json'},
            data: {
                exclude_filter: ["beans"],
                include_filter: ["tomato", "garlic"]
            }
        };

        const res = await axios(options);

        // Check size
        expect(Object.keys(res.data).length).toBe(1);
    })
})