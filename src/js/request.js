const fetch = require('node-fetch');

const service = async (options, port, res, route = "" ) => {
    console.log("request 1");
    try {
        console.log("request");
        const serviceRes = await fetch(`http://localhost:${port}/${route}`,
                                    options)
                                .then(res => res.json());
        
        res.send(JSON.stringify(serviceRes));
    } catch(error) {
        res.end(error.message);
    }
};

module.exports = {
    service: service
};