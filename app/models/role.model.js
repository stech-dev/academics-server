module.exports = (sequilize, Sequilize) => {
    const Role = sequilize.define("roles", {
        name: {
            type: Sequilize.STRING
        }
    }
    );

    return Role;
}