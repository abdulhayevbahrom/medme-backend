const { check } = require("./check.validation");

class clientValidation {
  async add(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        idNumber: { type: "string" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        year: { type: "string" },
        stories: {
          type: "object",
          properties: {
            doctorID: { type: "string" },
            choseDoctor: { type: "string" },
            payState: { type: "boolean" },
            secondary: { type: "boolean" },
            paySumm: { type: "number" },
            doctorIdNumber: { type: "string" },
            doctorFirstName: { type: "string" },
            doctorLastName: { type: "string" },
            doctorPhone: { type: "string" },
            temperature: { type: "string" },
            weight: { type: "number" },
            height: { type: "number" },
            diagnostics: { type: "string" },
            analysis: { type: "string" },
            urgentCheck: { type: "string" },
            urgent: { type: "boolean" },
            blood_analysis: { type: "boolean" },
            biochemical_analysis: { type: "boolean" },
            sickname: { type: "string" },
            view: { type: "boolean" },
            day: { type: "string" },
            month: { type: "string" },
            queueNumber: { type: "number" },
            retsept: {
              type: "object",
              properties: {
                writed_at: { type: "string" },
                writed_doctor: { type: "string" },
                patientStatus: { type: "string" },
                sickname: { type: "string" },
                retseptList: { type: "string" },
              },
            },
            room: {
              type: "object",
              properties: {
                dayOfTreatment: { type: "number" },
                payForRoom: { type: "number" },
                roomNumber: { type: "number" },
                outDay: { type: "number" },
              },
            },
          },
        },
      },
      required: [
        "firstname",
        "lastname",
        "phone",
        "idNumber",
        "address",
        "year",
      ],
    };

    const result = await check(schema, req.body);
    if (!result) return next();
    await res.status(400).send(result);
  }
}

module.exports = new clientValidation();
