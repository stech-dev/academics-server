const { authJwt } = require("../middleware");
const controller = require("../controllers/admission.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/admission/create", [authJwt.verifyToken], controller.createAdmission);
    app.get("/api/admission/create", [authJwt.verifyToken], controller.getAdmissionForm);
};