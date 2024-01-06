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
        address: {
          type: "string",
        },
        year: {
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
        doctorPhone: {
          type: "string",
        },
        idNumber: {
          ttype: "string",
          required: [true, "ID number is required"],
        },
        temperature: {
          type: "string",
        },
        weight: {
          type: "number",
        },
        height: {
          type: "number",
        },
        diagnostics: {
          type: "string",
        },
        urgentCheck: {
          type: "string",
        },
        analysis: {
          type: "string",
        },
        urgent: {
          type: "string",
        },

        sickname: {
          type: "string",
        },
        retsept: [
          {
            writed_at: {
              type: "string",
            },
            writed_doctor: {
              type: "string",
            },
            patientStatus: {
              type: "string",
            },
            sickname: {
              type: "string",
            },
            retseptList: {
              type: "string",
            }
          }
        ],
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
            outDay: {
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
        "idNumber",
        "address",
        "year"
      ],
    };

    const result = await check(schema, req.body);
    if (!result) return next();
    await res.status(400).send(result);
  }
}

module.exports = new clientValidation();
