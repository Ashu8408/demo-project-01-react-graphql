const { gql } = require("apollo-server");

const typeDefs = gql`
    
    type PlanetDetails {
        # type: String!
        about: String
        aphelion: String 
        perihelion: String
        semiMajorAxis: String
        eccentricity: String
        orbitalPeriod: String
        synodicPeriod: String
        averageSpeed: String
        meanAnomaly: String
        longitudeOfAscendingNode: String
        argumentOfPerihelion: String
        satellites: String
    }
    
    type Planet {
        id: ID!,
        name: String!
        details: PlanetDetails
        menu_image: String!
    }

    type Query {
        planets: [Planet!]!
        # planet(id: ID!): Planet!

    }
`

module.exports = { typeDefs }