module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("state", {
        name: {
            type: Sequelize.STRING
        }
    });

    return State;
};