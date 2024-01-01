const { check } = require("./check.validation");

class clientValidation {
  async add(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        firstname: {
          type: "string",
          minLength: 3,
          maxLength: 20,
        },
        lastname: {
          type: "string",
          minLength: 3,
          maxLength: 20,
        },
        phone: {
          type: "string",
          minLength: 9,
          maxLength: 9,
        },
        choseDoctor: {
          type: "string",
        },
        payState: {
          type: "boolean",
        },
        paySumm: {
          type: "number",
        },
        doctorFirstName: {
          type: "string",
        },
        doctorLastName: {
          type: "string",
        },
        sickname: {
          type: "string",
        },
        retsept: {
          type: "string",
        },
        view: {
          type: "boolean",
        },
        day: {
          type: "string",
        },
        month: {
          type: "string",
        },
        room: {
          type: "object",
          properties: {
            dayOfTreatment: {
              type: "string",
            },
            payForRoom: {
              type: "number",
            },
            roomNumber: {
              type: "number",
            },
            outDate: {
              type: "string",
            },
          },
        },
      },
      required: [
        "firstname",
        "lastname",
        "phone",
        "choseDoctor",
        "payState",
        "paySumm",
        "doctorFirstName",
        "doctorLastName",
      ],
    };

    const result = await check(schema, req.body);
    if (!result) return next();
    await res.status(400).send(result);
  }
}

module.exports = new clientValidation();
