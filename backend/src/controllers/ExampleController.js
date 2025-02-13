const ExampleManager = require("../managers/ExampleManager");


const ExampleController = {
    callExampleManagerFunction: async (req, res) => {
        // Do something with req.body
        await ExampleManager.executeExampleManagerFunction(req.body.param1, req.body.param2)
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((error) => {
                res.status(500).json(error)
            })
    }
}

module.exports = ExampleController;