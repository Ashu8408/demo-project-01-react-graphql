const { PlanetList } = require("../PlanetData");

const resolvers = {
    Query: {
        planets: () => {
            return PlanetList;
        }
    }  
};

module.exports = { resolvers };