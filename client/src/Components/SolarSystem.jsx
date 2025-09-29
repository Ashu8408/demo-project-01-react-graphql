import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import HoverVideoPlayer from 'react-hover-video-player';

const QUERY_ALL_PLANETS = gql`
  query GetAllPlanets {
    planets {
      id
      name
      image
      planets_bg
      details {
        about
        aphelion 
        perihelion
        semiMajorAxis
        eccentricity
        orbitalPeriod
        synodicPeriod
        averageSpeed
        meanAnomaly
        longitudeOfAscendingNode
        argumentOfPerihelion
        satellites
      }
    }
  }
`;

export default function SolarSystem() {
  const { data: planetData, error: planetError, loading } = useQuery(QUERY_ALL_PLANETS);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // set first planet as default once data is loaded
  useEffect(() => {
    if (planetData?.planets?.length > 0) {
      setSelectedPlanet(planetData.planets[0]);
    }
  }, [planetData]);

  if (planetData) {
    console.log("Planets from GraphQL:", planetData.planets);
  }
if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h2 className="text-center text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (planetError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-500">
        <h2 className="text-center text-2xl font-semibold">Error loading planets!</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-no-repeat bg-center bg-cover sm:bg-fixed px-4 sm:px-6 md:px-8 cursor-none p-10">
      <div className="skills-content grid grid-cols-1 sm:grid-cols-[25%_50%_25%] w-full gap-4 sm:gap-6 p-3 sm:p-6" >
        {/* PLANET LIST */}
        <div className="planets-list flex flex-row sm:flex-col flex-wrap gap-3 sm:gap-4 justify-center sm:mt-10 sm:ml-2 w-40 mt-10 ml-2 max-h-[50vh] sm:max-h-[80vh]">
          {planetData.planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet)}
              className={`w-25 px-5 py-2 text-sm sm:text-base bg-[#313f40] text-white
                [clip-path:polygon(20%_0,100%_0,100%_45%,80%_100%,0_100%,0_45%)] 
                [-webkit-clip-path:polygon(20%_0,100%_0,100%_45%,80%_100%,0_100%,0_45%)] 
                overflow-hidden cursor-none
                ${
                  selectedPlanet?.name === planet.name
                    ? "bg-blue-500"
                    : "bg-gray-800 hover:bg-gray-600"
                }`}>
                  {planet.name}
            </button>
          ))}
        </div>
        {/* PLANET IMAGE */}
        <div className="planet-gif flex justify-center ">
          {selectedPlanet && (
            (selectedPlanet?.planets_bg?.endsWith(".mp4") ? 
              (
                <HoverVideoPlayer 
                  videoSrc={`/planets_bg/${selectedPlanet.planets_bg}`} 
                  loadingOverlay={
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white rounded-lg">
                      Loading...
                    </div>  
                  }
                />
              )  : (
                    <div className="flex justify-center items-center min-h-screen text-red-500">
                      <h2 className="text-center text-2xl font-semibold">Planet model not found</h2>
                    </div>
                  )
            ))}
        </div>

        {/* PLANET DATA */}
        <div className="flex item-center p-4 sm:p-6 bg-[#313f40] rounded-2xl shadow-lg overflow-y-auto max-h-[50vh] sm:max-h-[80vh]">
          {selectedPlanet && (
            <div>
              <div className="text-center bg-[#2a5b65] text-lg sm:text-xl flex justify-center font-bold px-5 py-2 mb-5 text-white 
                              [clip-path:polygon(20%_0,100%_0,100%_45%,80%_100%,0_100%,0_45%)] 
                              [-webkit-clip-path:polygon(20%_0,100%_0,100%_45%,80%_100%,0_100%,0_45%)] md:text-sm">
                <p>{selectedPlanet.name}</p>
              </div>
              <div className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base md:text-sm">
                {Object.entries(selectedPlanet.details)
                  .filter(([key]) => key !== "__typename")
                  .map(([key, value]) => {
                    if (!value || key === "about") return null;
                    return (
                      <p key={key}>
                        <span className="font-semibold capitalize">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </span>{" "}
                        {value}
                      </p>
                    );
                  })}
              </div>
              <p className="text-gray-300 mt-4 sm:mt-6 mb-2 text-sm sm:text-base leading-relaxed">
                {selectedPlanet.details.about}
              </p>
              <p className="text-gray-300 mt-4 sm:mt-6 mb-2 text-sm sm:text-base leading-relaxed">
                {selectedPlanet.details.about}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
