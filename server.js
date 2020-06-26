const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:5001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Country = db.country;
const State = db.state;
db.sequelize.sync({ force: true }).then(() => {
    initial();
});

function initial() {
    Role.create({
        name: "user"
    });

    Role.create({
        name: "moderator"
    });

    Role.create({
        name: "admin"
    });

    Country.create({
        name: "India"
    }).then((country) => {
        console.log(country.get(0));
        State.create({
            name: "Goa",
            countryId: country.get(0).id
        });
    });

}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Academics application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/admission.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});