const { check } = require("./check.validation");

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
        analisisPrices: {
          type: "object",
          properties: {
            blood_analysis: {
              type: "number",
            },
            urine_analysis: {
              type: "number",
            },
            biochemical_analysis: {
              type: "number",
            },
          },
        },
        labator: {
          type: "string",
        },
        diagnostica: {
          type: "string",
        },
        analis: {
          type: "string",
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
        },
        checkList: {
          type: "string",
        },
        percent: {
          type: "number",
        },
        salary: {
          type: "number",
        },
      },
      required: [
        "firstName",
        "lastName",
        "phone",
        "email",
        "address",
        "login",
        "password",
        "docORrecep",
      ],
    };

    const result = await check(schema, req.body);
    if (!result) return next();
    await res.status(400).send(result);
  }
}

module.exports = new adminValidation();
