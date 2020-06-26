module.exports = (sequelize, Sequelize) => {
    const Admission = sequelize.define("admission", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        dateOfBirth: {
            type: Sequelize.STRING
        },
        parentsFirstname: {
            type: Sequelize.STRING
        },
        parentsLastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        class: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.BIGINT,
            unique: true,
            validate: {
                not: {
                    args: ["[a-z]", 'i'],
                    msg: "Please enter a valid number"
                },
                len: {
                    args: [10, 20],
                    msg: "Min length of the phone number is 10"
                }
            }
        }
    });

    return Admission;
};
