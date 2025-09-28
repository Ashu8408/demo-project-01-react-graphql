import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";


const QUERY_ALL_PLANETS = gql`
  query GetAllPlanets {
    planets {
      id
      name
      image
      details {
        about
      }
    }
  }
`;

export default function Planet() {
  const { name } = useParams();

  const { data: planetData, error: planetError, loading } = useQuery(QUERY_ALL_PLANETS);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h2 className="text-center text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (planetError) {
    console.error(error);
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h2 className="text-center text-2xl font-semibold">Error loading planet</h2>
      </div>
    );
  }

  const planet = planetData.planets.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (!planet) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h2 className="text-center text-2xl font-semibold">Planet not found</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-no-repeat bg-center bg-cover sm:bg-fixed px-4 sm:px-6 md:px-8 cursor-none p-20"
      style={{ backgroundImage: `url(/planet_bg/${planet.image})` }}>
      <div
        name="card_1"
        className="w-full sm:w-11/12 md:w-3/4 min-h-[60vh] md:min-h-[75vh] 
               p-4 sm:p-6 md:p-8 border-4 sm:border-6 md:border-8 
               border-gray-800 rounded-lg flex flex-col items-center 
               justify-center space-y-4 sm:space-y-6"
      >
        {/* Planet Title */}
        <p className="font-serif text-white 
                 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center">
          {planet.name.split("").join(" ")}
        </p>

        {/* Nested Card 2 */}
        <div
          name="card_2"
          className="w-full p-4 sm:p-6 border border-gray-950 
                 rounded-lg bg-white/5 backdrop-blur-sm" >
          <p className="font-serif text-gray-300 text-sm sm:text-base md:text-lg text-center leading-relaxed">
            {planet.details?.about || "No details available"}
          </p>
        </div>
      </div>
    </div>
  );
}
