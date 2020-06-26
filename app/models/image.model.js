module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
        fileName: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB
        }
    });

    return Image;
};