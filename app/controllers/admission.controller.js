const db = require("../models");
const Admission = db.admission;
const Address = db.address;
const Image = db.image;

exports.createAdmission = (req, res) => {
    db.admission.create({
        firstName: req.body.admission.firstName,
        lastName: req.body.admission.lastName,
        gender: req.body.admission.gender,
        dateOfBirth: req.body.admission.dateOfBirth,
        parentsFirstName: req.body.admission.parentsFirstName,
        parentsLastName: req.body.admission.parentsFirstName,
        email: req.body.admission.email,
        mobile: req.body.admission.mobile,
        class: req.body.admission.class,
        status: "PENDING"
    }).then((admission) => {
        console.log(admission);
        Address.create({
            address: req.body.address.address,
            city: req.body.address.city,
            state: req.body.address.state,
            country: req.body.address.country,
            admissionId: admission.id
        }).then((address) => {
            //console.log(address);
            admission.setAddress(address);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

        Image.create({
            fileName: req.body.image.fileName,
            data: req.body.image.data,
        }).then((image) => {
            admission.setImages([image]).then(() => {
                res.send({ message: "Admission form submitted." });
            })
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAdmissionForm = (req, res) => {
    db.admission.findOne({
        where: {
            id: req.body.admissionId
        }
    }).then(admission => {
        if (!admission) {
            return res.status(404).send({ message: "Admission form not found." });
        }

        console.log("adress", admission.getAddress(), admission.getImages());

        admission.getAddress().then((address) => {
            return res.status(200).send({
                admission: admission,
                address: address
            });
        });
    }
    );
}