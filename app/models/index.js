const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.country = require("./country.model.js")(sequelize, Sequelize);
db.state = require("./state.model.js")(sequelize, Sequelize);
db.address = require("./address.model.js")(sequelize, Sequelize);
db.image = require("./image.model.js")(sequelize, Sequelize);
db.admission = require("./admission.model.js")(sequelize, Sequelize);

//Learn about db relations
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.country.hasMany(db.state, { as: "states" });
db.state.belongsTo(db.country, {
    foreignKey: "countryId",
    as: "country",
});

db.user.hasOne(db.admission, { as: "admission" });
db.admission.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});

db.address.hasOne(db.admission, { as: "admission" });
db.admission.belongsTo(db.address, {
    foreignKey: "addressId",
    as: "address",
});

db.image.hasMany(db.admission, { as: "admission" });
db.admission.belongsTo(db.image, {
    foreignKey: "imageId",
    as: "image",
});


db.ROLES = ["user", "admin", "moderator"];
module.exports = db;