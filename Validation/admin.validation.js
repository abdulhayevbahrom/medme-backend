const { check } = require("./check.validation")

class adminValidation {
    async add(req, res, next) {
        const schema = {
            type: "object",
            properties: {
                userId: {
                    type: "string",
                },
                firstName: {
                    type: "string",
                    minLength: 3,
                    maxLength: 20,
                },
                lastName: {
                    type: "string",
                    minLength: 3,
                    maxLength: 20,
                },
                phone: {
                    type: "string",
                    minLength: 9,
                    maxLength: 9,
                },
                email: {
                    type: "string",
                    minLength: 3,
                },
                address: {
                    type: "string",
                    minLength: 3,
                },
                specialization: {
                    type: "string",
                    minLength: 3,
                },
                experience: {
                    type: "string",
                },
                feesPerCunsaltation: {
                    type: "number",
                },
                login: {
                    type: "string",
                    minLength: 3,
                },
                password: {
                    type: "string",
                    minLength: 3,
                },
                docORrecep: {
                    type: "string",
                    minLength: 3,
                }
            },
            required: ["firstName", "lastName", "phone", "email", "address", "login", "password", "docORrecep"]
        }

        const result = await check(schema, req.body)
        if (!result) return next()
        await res.status(400).send(result)
    }
}

module.exports = new adminValidation()