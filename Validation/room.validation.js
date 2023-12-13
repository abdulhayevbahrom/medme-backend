const { check } = require("./check.validation")

class roomValidation {
    async add(req, res, next) {
        const schema = {
            type: "object",
            properties: {
                roomNumber: {
                    type: "number",
                },
                pricePerDay: {
                    type: "number",
                },
                category: {
                    type: "string"
                },
                usersNumber: {
                    type: "number",
                },
                capacity: {
                    type: "array",
                },
                floor: {
                    type: "number",
                }
            },
            required: ["roomNumber", "pricePerDay", "category", "usersNumber", "floor"]
        }

        const result = await check(schema, req.body)
        if (!result) return next()
        await res.status(400).send(result)
    }
}

module.exports = new roomValidation()
