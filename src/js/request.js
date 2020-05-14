const fetch = require('node-fetch');

const service = async (options, port, res, route = "" ) => {
    try {
        const serviceRes = await fetch(`http://localhost:${port}/${route}`,
                                    options)
                                .then(fres => fres.json());
        res.send(JSON.stringify(serviceRes));
    } catch(error) {

        res.end(error.message);
    }
};

module.exports = {
    service: service
};